<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\Persistence;

use MissionControlBackend\Persistence\Record;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

class ServerRecord extends Record
{
    public static function getTableName(): string
    {
        return ServersTable::TABLE_NAME;
    }

    public function tableName(): string
    {
        return ServersTable::TABLE_NAME;
    }

    /** Primary key */
    public string $id = '';

    public bool $is_active = true;

    public string|null $project_id = null;

    public string $title = '';

    public string $slug = '';

    public string $ssh_user_name = '';

    public string $address = '';

    public int $ssh_port = 0;

    public string|null $ssh_key_id = null;
}
