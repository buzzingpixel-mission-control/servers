<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs;

use MissionControlBackend\ActionResult;
use MissionControlServers\Pipelines\Jobs\Persistence\CreatePipelineJob;
use MissionControlServers\Pipelines\Jobs\Persistence\FindPipelineJobParameters;
use MissionControlServers\Pipelines\Jobs\Persistence\FindPipelineJobs;

readonly class PipelineJobRepository
{
    public function __construct(
        private FindPipelineJobs $find,
        private CreatePipelineJob $create,
    ) {
    }

    public function create(string $pipelineId): ActionResult
    {
        return $this->create->create($pipelineId);
    }

    public function findOne(
        FindPipelineJobParameters|null $parameters = null,
    ): PipelineJob {
        return PipelineJob::fromRecord(
            $this->find->findOne($parameters),
        );
    }

    public function findOneOrNull(
        FindPipelineJobParameters|null $parameters = null,
    ): PipelineJob|null {
        $record = $this->find->findOneOrNull($parameters);

        if ($record === null) {
            return null;
        }

        return PipelineJob::fromRecord($record);
    }
}
