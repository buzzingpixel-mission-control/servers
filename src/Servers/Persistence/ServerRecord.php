<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\Persistence;

use MissionControlBackend\Persistence\Record;
use MissionControlServers\Servers\NewServer;
use MissionControlServers\Servers\Server;

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

    public static function fromNewEntity(NewServer $entity): self
    {
        $record = new self();

        $record->title = $entity->title->toNative();

        $record->ssh_user_name = $entity->sshUserName->toNative();

        $record->address = $entity->address->toNative();

        $record->ssh_port = $entity->sshPort->toNative();

        $record->ssh_key_id = $entity->sshKeyId->toNative();

        $record->project_id = $entity->projectId->toNative();

        $record->slug = $entity->slug->toNative();

        return $record;
    }

    public static function fromEntity(Server $entity): self
    {
        $record = new self();

        $record->id = $entity->id->toNative();

        $record->is_active = $entity->isActive->toNative();

        $record->project_id = $entity->projectId->toNative();

        $record->title = $entity->title->toNative();

        $record->slug = $entity->slug->toNative();

        $record->ssh_user_name = $entity->sshUserName->toNative();

        $record->address = $entity->address->toNative();

        $record->ssh_port = $entity->sshPort->toNative();

        $record->ssh_key_id = $entity->sshKeyId->toNative();

        return $record;
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
