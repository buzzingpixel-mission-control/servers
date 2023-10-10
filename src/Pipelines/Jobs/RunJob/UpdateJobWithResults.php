<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use MissionControlServers\Pipelines\Jobs\Persistence\FindPipelineJobParameters;
use MissionControlServers\Pipelines\Jobs\PipelineJobItem;
use MissionControlServers\Pipelines\Jobs\PipelineJobRepository;
use Psr\Clock\ClockInterface;

readonly class UpdateJobWithResults
{
    public function __construct(
        private ClockInterface $clock,
        private PipelineJobRepository $jobRepository,
    ) {
    }

    public function update(
        Result $result,
        JobContext $jobContext,
    ): void {
        $job = $this->jobRepository->findOne(
            FindPipelineJobParameters::create()->withId(
                $jobContext->pipelineJobId,
            ),
        );

        $totalItems = $job->pipelineJobItems->count();

        $totalFinished = $job->pipelineJobItems->filter(
            static fn (PipelineJobItem $item) => $item->isFinished(),
        )->count();

        if ($totalFinished === 0) {
            $job = $job->withPercentComplete(0)
                ->withIsFinished(false)
                ->withFinishedAt(null);
        } elseif ($totalFinished >= $totalItems) {
            $job = $job->withPercentComplete(100)
                ->withIsFinished()
                ->withFinishedAt($this->clock->now());
        } else {
            $job = $job
                ->withPercentComplete(
                    $totalFinished / $totalItems * 100,
                )
                ->withIsFinished(false)
                ->withFinishedAt(null);
        }

        if (! $result->success) {
            $job = $job->withHasFailed();
        }

        $this->jobRepository->saveWithoutSavingItems($job);
    }
}
