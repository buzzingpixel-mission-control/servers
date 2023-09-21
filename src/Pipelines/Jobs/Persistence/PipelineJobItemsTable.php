<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Persistence;

use Phinx\Db\Adapter\AdapterInterface;
use Phinx\Db\Adapter\PostgresAdapter;
use Phinx\Db\Table;
use Phinx\Migration\MigrationInterface;

class PipelineJobItemsTable
{
    public const TABLE_NAME = 'pipeline_job_items';

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
                'pipeline_job_id',
                PostgresAdapter::PHINX_TYPE_UUID,
            )
            ->addColumn(
                'pipeline_item_id',
                PostgresAdapter::PHINX_TYPE_UUID,
            )
            ->addColumn(
                'order',
                AdapterInterface::PHINX_TYPE_TINY_INTEGER,
                ['signed' => false],
            )
            ->addColumn(
                'has_failed',
                PostgresAdapter::PHINX_TYPE_BOOLEAN,
            )
            ->addColumn(
                'log_content',
                PostgresAdapter::PHINX_TYPE_TEXT,
            )
            ->addColumn(
                'finished_at',
                PostgresAdapter::PHINX_TYPE_DATETIME,
            )
            ->addIndex(['pipeline_id'])
            ->addIndex(['pipeline_job_id'])
            ->addIndex(['pipeline_item_id'])
            ->addIndex(['has_failed']);
    }
}
