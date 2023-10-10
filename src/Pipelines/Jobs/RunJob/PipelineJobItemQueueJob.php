<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use JetBrains\PhpStorm\ArrayShape;
use MissionControlServers\Pipelines\Jobs\Persistence\FindPipelineJobParameters;
use MissionControlServers\Pipelines\Jobs\PipelineJobItem;
use MissionControlServers\Pipelines\Jobs\PipelineJobRepository;
use MissionControlServers\Pipelines\Persistence\FindPipelineParameters;
use MissionControlServers\Pipelines\PipelineItem;
use MissionControlServers\Pipelines\PipelineRepository;

readonly class PipelineJobItemQueueJob
{
    public function __construct(
        private RunPipelineItem $runPipelineItem,
        private SetJobHasStarted $setJobHasStarted,
        private PipelineJobRepository $jobRepository,
        private PipelineRepository $pipelineRepository,
        private UpdateJobWithResults $updateJobWithResults,
        private UpdateJobItemWithResults $updateJobItemWithResults,
    ) {
    }

    /** @param string[] $context */
    public function __invoke(
        /** @phpstan-ignore-next-line */
        #[ArrayShape([
            'pipelineJobId' => 'string',
            'pipelineJobItemId' => 'string',
        ])]
        array $context,
    ): void {
        $jobContext = JobContext::fromArray($context);

        $job = $this->jobRepository->findOne(
            FindPipelineJobParameters::create()
                ->withId($jobContext->pipelineJobId),
        );

        $jobItem = $job->pipelineJobItems->filter(
            static fn (
                PipelineJobItem $item,
            ) => $item->id->toNative() === $jobContext->pipelineJobItemId,
        )->first();

        $pipeline = $this->pipelineRepository->findOne(
            FindPipelineParameters::create()->withId(
                $job->pipelineId->toNative(),
            ),
        );

        $pipelineItem = $pipeline->pipelineItems->filter(
            static fn (
                PipelineItem $item,
            ) => $item->id->toNative() === $jobItem->pipelineItemId->toNative()
        )->first();

        if (
            $job->hasFailed->isTrue() &&
            ! $pipelineItem->runAfterFail->isTrue()
        ) {
            return;
        }

        $job = $this->setJobHasStarted->set($job);

        $result = $this->runPipelineItem->run(
            $pipeline,
            $pipelineItem,
            $job,
            $jobItem,
        );

        $this->updateJobItemWithResults->update(
            $result,
            $jobItem,
        );

        $this->updateJobWithResults->update(
            $result,
            $jobContext,
        );
    }
}
