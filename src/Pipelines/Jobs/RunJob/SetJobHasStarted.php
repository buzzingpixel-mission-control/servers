<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use MissionControlServers\Pipelines\Jobs\PipelineJob;
use MissionControlServers\Pipelines\Jobs\PipelineJobRepository;

readonly class SetJobHasStarted
{
    public function __construct(
        private PipelineJobRepository $jobRepository,
    ) {
    }

    public function set(PipelineJob $job): PipelineJob
    {
        if ($job->hasStarted->isTrue()) {
            return $job;
        }

        $job = $job->withHasStarted(true);

        $this->jobRepository->saveWithoutSavingItems($job);

        return $job;
    }
}
