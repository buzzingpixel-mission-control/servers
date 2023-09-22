<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines;

use MissionControlBackend\ActionResult;
use MissionControlServers\Pipelines\Persistence\CreatePipeline;
use MissionControlServers\Pipelines\Persistence\FindPipelineParameters;
use MissionControlServers\Pipelines\Persistence\FindPipelines;
use MissionControlServers\Pipelines\Persistence\PipelineRecord;
use MissionControlServers\Pipelines\Persistence\SavePipeline;

readonly class PipelineRepository
{
    public function __construct(
        private SavePipeline $save,
        private FindPipelines $find,
        private CreatePipeline $create,
    ) {
    }

    public function create(NewPipeline $entity): ActionResult
    {
        return $this->create->create(
            PipelineRecord::fromNewEntity($entity),
        );
    }

    public function save(Pipeline $entity): ActionResult
    {
        return $this->save->save(
            PipelineRecord::fromEntity($entity),
        );
    }

    public function findOne(
        FindPipelineParameters|null $parameters = null,
    ): Pipeline {
        return Pipeline::fromRecord(
            $this->find->findOne($parameters),
        );
    }

    public function findOneOrNull(
        FindPipelineParameters|null $parameters = null,
    ): Pipeline|null {
        $record = $this->find->findOneOrNull($parameters);

        if ($record === null) {
            return null;
        }

        return Pipeline::fromRecord($record);
    }

    public function findAll(
        FindPipelineParameters|null $parameters = null,
    ): PipelineCollection {
        $records = $this->find->findAll($parameters);

        /** @phpstan-ignore-next-line */
        return new PipelineCollection($records->map(
            static fn (PipelineRecord $record) => Pipeline::fromRecord(
                $record,
            )
        ));
    }
}
