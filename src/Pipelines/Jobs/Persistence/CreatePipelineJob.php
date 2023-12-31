<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Persistence;

use MissionControlBackend\Persistence\DateFormats;
use MissionControlBackend\Persistence\MissionControlPdo;
use MissionControlBackend\Persistence\UuidFactoryWithOrderedTimeCodec;
use MissionControlServers\Pipelines\Jobs\PipelineJob;
use MissionControlServers\Pipelines\Persistence\FindPipelineParameters;
use MissionControlServers\Pipelines\Persistence\FindPipelines;
use Psr\Clock\ClockInterface;

use function implode;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class CreatePipelineJob
{
    public function __construct(
        private ClockInterface $clock,
        private MissionControlPdo $pdo,
        private FindPipelines $findPipelines,
        private UuidFactoryWithOrderedTimeCodec $uuidFactory,
        private AddNewPipelineJobItems $addNewPipelineJobItems,
    ) {
    }

    public function create(string $pipelineId): CreatePipelineActionResult
    {
        $pipeline = $this->findPipelines->findOneOrNull(
            FindPipelineParameters::create()->withId(
                $pipelineId,
            ),
        );

        if ($pipeline === null) {
            return new CreatePipelineActionResult(
                false,
                ['Unknown pipeline'],
            );
        }

        $record = new PipelineJobRecord();

        $record->id = $this->uuidFactory->uuid4()->toString();

        $record->pipeline_id = $pipeline->id;

        $record->added_at = $this->clock->now()->format(
            DateFormats::POSTGRES_ISO8601,
        );

        foreach ($pipeline->pipelineItems()->records as $i => $itemRecord) {
            $order = $i + 1;

            $jobItem = new PipelineJobItemRecord();

            $jobItem->id = $this->uuidFactory->uuid4()->toString();

            $jobItem->pipeline_id = $record->pipeline_id;

            $jobItem->pipeline_job_id = $record->id;

            $jobItem->pipeline_item_id = $itemRecord->id;

            $jobItem->item_order = $order;

            $record->addPipelineJobItem($jobItem);
        }

        $this->pdo->beginTransaction();

        $statement = $this->pdo->prepare(implode(' ', [
            'INSERT INTO',
            $record->tableName(),
            $record->columnsAsInsertIntoString(),
            'VALUES',
            $record->columnsAsValuePlaceholders(),
        ]));

        if (! $statement->execute($record->asParametersArray())) {
            $this->pdo->rollBack();

            return new CreatePipelineActionResult(
                false,
                $this->pdo->errorInfo(),
                $this->pdo->errorCode(),
            );
        }

        $result = $this->addNewPipelineJobItems->add(
            $this->pdo,
            $record->pipelineJobItems(),
        );

        if (! $result->success) {
            $this->pdo->rollBack();

            return CreatePipelineActionResult::fromActionResult($result);
        }

        $this->pdo->commit();

        return new CreatePipelineActionResult(job: PipelineJob::fromRecord(
            $record,
        ));
    }
}
