<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Persistence;

use MissionControlBackend\Persistence\Record;

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

    /** Primary key */
    public string $id = '';

    public string $pipeline_id = '';

    public bool $has_started = false;

    public bool $is_finished = false;

    public bool $has_failed = false;

    public float $percent_complete = 0;

    public string $added_at = '';

    public string $finished_at = '';

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
