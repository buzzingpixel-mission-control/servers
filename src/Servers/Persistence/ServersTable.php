<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\Persistence;

use Phinx\Db\Adapter\AdapterInterface;
use Phinx\Db\Adapter\PostgresAdapter;
use Phinx\Db\Table;
use Phinx\Migration\MigrationInterface;

class ServersTable
{
    public const TABLE_NAME = 'servers';

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
                'is_active',
                PostgresAdapter::PHINX_TYPE_BOOLEAN,
            )
            ->addColumn(
                'project_id',
                PostgresAdapter::PHINX_TYPE_UUID,
                ['null' => true],
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
                'ssh_user_name',
                AdapterInterface::PHINX_TYPE_STRING,
            )
            ->addColumn(
                'address',
                AdapterInterface::PHINX_TYPE_STRING,
            )
            ->addColumn(
                'ssh_port',
                AdapterInterface::PHINX_TYPE_INTEGER,
                ['signed' => false],
            )
            ->addColumn(
                'ssh_key_id',
                PostgresAdapter::PHINX_TYPE_UUID,
                ['null' => true],
            )
            ->addIndex(['is_active'])
            ->addIndex(['project_id'])
            ->addIndex(['title'])
            ->addIndex(['slug'])
            ->addIndex(['ssh_key_id']);
    }
}
