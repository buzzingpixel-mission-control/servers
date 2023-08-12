<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys;

use MissionControlServers\SshKeys\Persistence\SshKeyRecord;
use MissionControlServers\SshKeys\ValueObjects\Id;
use MissionControlServers\SshKeys\ValueObjects\IsActive;
use MissionControlServers\SshKeys\ValueObjects\PrivateKey;
use MissionControlServers\SshKeys\ValueObjects\PublicKey;
use MissionControlServers\SshKeys\ValueObjects\Slug;
use MissionControlServers\SshKeys\ValueObjects\Title;
use Spatie\Cloneable\Cloneable;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class SshKey
{
    use Cloneable;

    public static function fromRecord(SshKeyRecord $record): self
    {
        return new self(
            Id::fromNative($record->id),
            IsActive::fromNative($record->is_active),
            Title::fromNative($record->title),
            Slug::fromNative($record->slug),
            PublicKey::fromNative($record->public),
            PrivateKey::fromNative($record->private),
        );
    }

    public function __construct(
        public Id $id,
        public IsActive $isActive,
        public Title $title,
        public Slug $slug,
        public PublicKey $public,
        public PrivateKey $private,
    ) {
    }

    /** @return array<string, scalar|null> */
    public function asArray(): array
    {
        return [
            'id' => $this->id->toNative(),
            'isActive' => $this->isActive->toNative(),
            'title' => $this->title->toNative(),
            'slug' => $this->slug->toNative(),
            'public' => $this->public->toNative(),
            'private' => $this->private->toNative(),
        ];
    }
}
