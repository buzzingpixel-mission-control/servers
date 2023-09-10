<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Persistence;

use Phinx\Db\Adapter\AdapterInterface;
use Phinx\Db\Adapter\PostgresAdapter;
use Phinx\Db\Table;
use Phinx\Migration\MigrationInterface;

class PipelineItemsTable
{
    public const TABLE_NAME = 'pipeline_items';

    public static function createSchema(MigrationInterface $migration): Table
    {
        return $migration->table(
            self::TABLE_NAME,
            [
                'id' => false,
                'primary_key' => ['id'],
            ],
        )
            ->addColumn(
                'id',
                PostgresAdapter::PHINX_TYPE_UUID,
            )
            ->addColumn(
                'pipeline_id',
                PostgresAdapter::PHINX_TYPE_UUID,
            )
            ->addColumn(
                'item_order',
                AdapterInterface::PHINX_TYPE_TINY_INTEGER,
                ['signed' => false],
            )
            ->addColumn(
                'type',
                AdapterInterface::PHINX_TYPE_STRING,
            )
            ->addColumn(
                'description',
                AdapterInterface::PHINX_TYPE_STRING,
            )
            ->addColumn(
                'script',
                AdapterInterface::PHINX_TYPE_TEXT,
            )
            ->addColumn(
                'run_on_servers',
                AdapterInterface::PHINX_TYPE_JSON,
            )
            ->addColumn(
                'run_after_fail',
                PostgresAdapter::PHINX_TYPE_BOOLEAN,
            )
            ->addIndex(['pipeline_id'])
            ->addIndex(['item_order'])
            ->addIndex(['type'])
            ->addIndex(['run_after_fail']);
    }
}
