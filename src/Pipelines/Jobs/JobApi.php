<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs;

use MissionControlBackend\ActionResult;
use MissionControlServers\Pipelines\Jobs\Persistence\CreatePipelineJob;
use MissionControlServers\Pipelines\Jobs\Persistence\FindPipelineJobParameters;
use MissionControlServers\Pipelines\Pipeline;

readonly class JobApi
{
    public function __construct(
        private CreatePipelineJob $createPipelineJob,
        private PipelineJobRepository $repository,
    ) {
    }

    public function runPipelineIfNotRunning(
        Pipeline $pipeline,
    ): ActionResult {
        $unRunJob = $this->repository->findOneOrNull(
            FindPipelineJobParameters::create()->withPipelineId(
                $pipeline->id->toNative(),
            ),
        );

        if ($unRunJob !== null) {
            return new ActionResult(false);
        }

        return $this->createPipelineJob->create(
            $pipeline->id->toNative(),
        );
    }
}
