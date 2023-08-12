<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys\Persistence;

use Phinx\Db\Adapter\AdapterInterface;
use Phinx\Db\Adapter\PostgresAdapter;
use Phinx\Db\Table;
use Phinx\Migration\MigrationInterface;

class SshKeysTable
{
    public const TABLE_NAME = 'ssh_keys';

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
                'title',
                AdapterInterface::PHINX_TYPE_STRING,
            )
            ->addColumn(
                'slug',
                AdapterInterface::PHINX_TYPE_STRING,
            )
            ->addColumn(
                'public',
                AdapterInterface::PHINX_TYPE_TEXT,
            )
            ->addColumn(
                'private',
                AdapterInterface::PHINX_TYPE_TEXT,
            )
            ->addIndex(['is_active'])
            ->addIndex(['title'])
            ->addIndex(['slug']);
    }
}
