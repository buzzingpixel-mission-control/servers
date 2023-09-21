<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Persistence;

use MissionControlBackend\Persistence\Record;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

class PipelineJobItemRecord extends Record
{
    public static function getTableName(): string
    {
        return PipelineJobItemsTable::TABLE_NAME;
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

    public int $order = 0;

    public bool $has_failed = false;

    public string $log_content = '';

    public string $finished_at = '';
}
