<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys\Persistence;

use MissionControlBackend\Persistence\Record;
use MissionControlServers\SshKeys\NewSshKey;
use MissionControlServers\SshKeys\SshKey;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

class SshKeyRecord extends Record
{
    public static function getTableName(): string
    {
        return SshKeysTable::TABLE_NAME;
    }

    public function tableName(): string
    {
        return SshKeysTable::TABLE_NAME;
    }

    public static function fromNewEntity(NewSshKey $entity): self
    {
        $record = new self();

        $record->title = $entity->title->toNative();

        $record->slug = $entity->slug->toNative();

        $record->public = $entity->public->toNative();

        $record->private = $entity->private->toNative();

        return $record;
    }

    public static function fromEntity(SshKey $entity): self
    {
        $record = new self();

        $record->id = $entity->id->toNative();

        $record->is_active = $entity->isActive->toNative();

        $record->title = $entity->title->toNative();

        $record->slug = $entity->slug->toNative();

        $record->public = $entity->public->toNative();

        $record->private = $entity->private->toNative();

        return $record;
    }

    /** Primary key */
    public string $id = '';

    public bool $is_active = true;

    public string $title = '';

    public string $slug = '';

    public string $public = '';

    public string $private = '';
}
