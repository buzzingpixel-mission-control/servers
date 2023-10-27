<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Persistence;

use MissionControlBackend\Persistence\Record;
use MissionControlServers\Pipelines\Jobs\PipelineJob;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

class PipelineJobRecord extends Record
{
    public static function getTableName(): string
    {
        return PipelineJobsTable::TABLE_NAME;
    }

    public function tableName(): string
    {
        return PipelineJobsTable::TABLE_NAME;
    }

    public static function fromEntity(PipelineJob $entity): self
    {
        $record = new self();

        $record->id = $entity->id->toNative();

        $record->pipeline_id = $entity->pipelineId->toNative();

        $record->has_started = $entity->hasStarted->toNative();

        $record->is_finished = $entity->isFinished->toNative();

        $record->has_failed = $entity->hasFailed->toNative();

        $record->percent_complete = $entity->percentComplete->toNative();

        $record->added_at = $entity->addedAt->toNative();

        $record->finished_at = $entity->finishedAt->toNative();

        return $record;
    }

    /** Primary key */
    public string $id = '';

    public string $pipeline_id = '';

    public bool $has_started = false;

    public bool $is_finished = false;

    public bool $has_failed = false;

    public float $percent_complete = 0;

    public string $added_at = '';

    public string|null $finished_at = null;

    private PipelineJobItemRecordCollection $pipelineJobItems;

    public function __construct()
    {
        $this->pipelineJobItems = new PipelineJobItemRecordCollection();
    }

    public function pipelineJobItems(): PipelineJobItemRecordCollection
    {
        return $this->pipelineJobItems;
    }

    public function setPipelineJobItems(
        PipelineJobItemRecordCollection $items,
    ): self {
        $this->pipelineJobItems = $items;

        return $this;
    }

    public function addPipelineJobItem(PipelineJobItemRecord $item): self
    {
        $this->pipelineJobItems->records[] = $item;

        return $this;
    }
}
