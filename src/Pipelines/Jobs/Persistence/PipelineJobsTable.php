<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Persistence;

use Phinx\Db\Adapter\PostgresAdapter;
use Phinx\Db\Table;
use Phinx\Migration\MigrationInterface;

class PipelineJobsTable
{
    public const TABLE_NAME = 'pipeline_jobs';

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
                'has_started',
                PostgresAdapter::PHINX_TYPE_BOOLEAN,
            )
            ->addColumn(
                'is_finished',
                PostgresAdapter::PHINX_TYPE_BOOLEAN,
            )
            ->addColumn(
                'has_failed',
                PostgresAdapter::PHINX_TYPE_BOOLEAN,
            )
            ->addColumn(
                'percent_complete',
                PostgresAdapter::PHINX_TYPE_FLOAT,
            )
            ->addColumn(
                'added_at',
                PostgresAdapter::PHINX_TYPE_DATETIME,
            )
            ->addColumn(
                'finished_at',
                PostgresAdapter::PHINX_TYPE_DATETIME,
                ['null' => true],
            )
            ->addIndex(['pipeline_id'])
            ->addIndex(['has_started'])
            ->addIndex(['is_finished'])
            ->addIndex(['has_failed']);
    }
}
