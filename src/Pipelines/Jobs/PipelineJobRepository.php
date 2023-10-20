<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs;

use MissionControlBackend\ActionResult;
use MissionControlServers\Pipelines\Jobs\Persistence\CreatePipelineJob;
use MissionControlServers\Pipelines\Jobs\Persistence\FindPipelineJobParameters;
use MissionControlServers\Pipelines\Jobs\Persistence\FindPipelineJobs;
use MissionControlServers\Pipelines\Jobs\Persistence\PipelineJobItemRecord;
use MissionControlServers\Pipelines\Jobs\Persistence\PipelineJobRecord;
use MissionControlServers\Pipelines\Jobs\Persistence\SavePipelineJobItem;
use MissionControlServers\Pipelines\Jobs\Persistence\SavePipelineJobWithoutSavingItems;

readonly class PipelineJobRepository
{
    public function __construct(
        private FindPipelineJobs $find,
        private CreatePipelineJob $create,
        private SavePipelineJobItem $savePipelineJobItem,
        private SavePipelineJobWithoutSavingItems $savePipelineJobWithoutSavingItems,
    ) {
    }

    public function create(string $pipelineId): ActionResult
    {
        return $this->create->create($pipelineId);
    }

    public function saveWithoutSavingItems(PipelineJob $job): ActionResult
    {
        return $this->savePipelineJobWithoutSavingItems->save(
            PipelineJobRecord::fromEntity($job),
        );
    }

    public function saveItem(PipelineJobItem $item): ActionResult
    {
        return $this->savePipelineJobItem->save(
            PipelineJobItemRecord::fromEntity($item),
        );
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

    public function findAll(
        FindPipelineJobParameters|null $parameters = null,
    ): PipelineJobCollection {
        $records = $this->find->findAll($parameters);

        return new PipelineJobCollection($records->map(
            static fn (
                PipelineJobRecord $record,
            ) => PipelineJob::fromRecord($record),
        ));
    }
}
