<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use MissionControlServers\Pipelines\Jobs\PipelineJobItem;
use MissionControlServers\Pipelines\Jobs\PipelineJobRepository;
use Psr\Clock\ClockInterface;

use function implode;

use const PHP_EOL;

readonly class UpdateJobItemWithResults
{
    public function __construct(
        private ClockInterface $clock,
        private PipelineJobRepository $repository,
    ) {
    }

    public function update(Result $result, PipelineJobItem $jobItem): void
    {
        $this->repository->saveItem(
            $jobItem
                ->withHasFailed(! $result->success)
                ->withLogContent(implode(
                    PHP_EOL,
                    $result->message,
                ))
                ->withFinishedAt($this->clock->now()),
        );
    }
}
