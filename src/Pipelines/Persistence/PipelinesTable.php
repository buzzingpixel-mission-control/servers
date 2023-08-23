<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Persistence;

use Phinx\Db\Adapter\AdapterInterface;
use Phinx\Db\Adapter\PostgresAdapter;
use Phinx\Db\Table;
use Phinx\Migration\MigrationInterface;

class PipelinesTable
{
    public const TABLE_NAME = 'pipelines';

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
                'project_id',
                PostgresAdapter::PHINX_TYPE_UUID,
                ['null' => true],
            )
            ->addColumn(
                'secret_id',
                PostgresAdapter::PHINX_TYPE_UUID,
                ['null' => true],
            )
            ->addColumn(
                'is_active',
                PostgresAdapter::PHINX_TYPE_BOOLEAN,
            )
            ->addColumn(
                'enable_webhook',
                PostgresAdapter::PHINX_TYPE_BOOLEAN,
            )
            ->addColumn(
                'webhook_check_for_branch',
                AdapterInterface::PHINX_TYPE_STRING,
            )
            ->addColumn(
                'title',
                AdapterInterface::PHINX_TYPE_STRING,
            )
            ->addColumn(
                'slug',
                AdapterInterface::PHINX_TYPE_STRING,
            )
            ->addColumn(
                'description',
                AdapterInterface::PHINX_TYPE_STRING,
            )
            ->addColumn(
                'run_before_every_item',
                AdapterInterface::PHINX_TYPE_TEXT,
            )
            ->addIndex(['project_id'])
            ->addIndex(['secret_id'])
            ->addIndex(['enable_webhook'])
            ->addIndex(['webhook_check_for_branch'])
            ->addIndex(['title'])
            ->addIndex(['slug']);
    }
}
