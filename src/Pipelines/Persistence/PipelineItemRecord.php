<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Persistence;

use MissionControlBackend\Persistence\Record;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

class PipelineItemRecord extends Record
{
    public static function getTableName(): string
    {
        return PipelineItemsTable::TABLE_NAME;
    }

    public function tableName(): string
    {
        return PipelineItemsTable::TABLE_NAME;
    }

    /** Primary key */
    public string $id = '';

    public string $pipeline_id = '';

    public int $item_order = 0;

    public string $type = '';

    public string $description = '';

    public string $script = '';

    public string $run_on_servers = '';

    public bool $run_after_fail = false;
}
