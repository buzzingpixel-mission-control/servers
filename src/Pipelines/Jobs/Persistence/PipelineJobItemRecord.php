<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Persistence;

use MissionControlBackend\Persistence\Record;
use MissionControlServers\Pipelines\Jobs\PipelineJobItem;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

class PipelineJobItemRecord extends Record
{
    public static function getTableName(): string
    {
        return PipelineJobItemsTable::TABLE_NAME;
    }

    public static function fromEntity(PipelineJobItem $entity): self
    {
        $record = new self();

        $record->id = $entity->id->toNative();

        $record->pipeline_id = $entity->pipelineId->toNative();

        $record->pipeline_job_id = $entity->pipelineJobId->toNative();

        $record->pipeline_item_id = $entity->pipelineItemId->toNative();

        $record->item_order = $entity->itemOrder->toNative();

        $record->has_failed = $entity->hasFailed->toNative();

        $record->log_content = $entity->logContent->toNative();

        $record->finished_at = $entity->finishedAt->toNative();

        return $record;
    }

    public function tableName(): string
    {
        return PipelineJobItemsTable::TABLE_NAME;
    }

    /** Primary key */
    public string $id = '';

    public string $pipeline_id = '';

    public string $pipeline_job_id = '';

    public string $pipeline_item_id = '';

    public int $item_order = 0;

    public bool $has_failed = false;

    public string $log_content = '';

    public string|null $finished_at = null;
}
