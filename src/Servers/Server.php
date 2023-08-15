<?php

declare(strict_types=1);

namespace MissionControlServers\Servers;

use MissionControlServers\Servers\Persistence\ServerRecord;
use MissionControlServers\Servers\ValueObjects\Address;
use MissionControlServers\Servers\ValueObjects\Id;
use MissionControlServers\Servers\ValueObjects\IsActive;
use MissionControlServers\Servers\ValueObjects\ProjectId;
use MissionControlServers\Servers\ValueObjects\Slug;
use MissionControlServers\Servers\ValueObjects\SshKeyId;
use MissionControlServers\Servers\ValueObjects\SshPort;
use MissionControlServers\Servers\ValueObjects\SshUserName;
use MissionControlServers\Servers\ValueObjects\Title;
use Spatie\Cloneable\Cloneable;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class Server
{
    use Cloneable;

    public static function fromRecord(ServerRecord $record): self
    {
        return new self(
            Id::fromNative($record->id),
            IsActive::fromNative($record->is_active),
            ProjectId::fromNative($record->project_id),
            Title::fromNative($record->title),
            Slug::fromNative($record->slug),
            SshUserName::fromNative(
                $record->ssh_user_name,
            ),
            Address::fromNative($record->address),
            SshPort::fromNative($record->ssh_port),
            SshKeyId::fromNative($record->ssh_key_id),
        );
    }

    public function __construct(
        public Id $id,
        public IsActive $isActive,
        public ProjectId $projectId,
        public Title $title,
        public Slug $slug,
        public SshUserName $sshUserName,
        public Address $address,
        public SshPort $sshPort,
        public SshKeyId $sshKeyId,
    ) {
    }

    /** @return array<string, scalar|null> */
    public function asArray(): array
    {
        return [
            'id' => $this->id->toNative(),
            'isActive' => $this->isActive->toNative(),
            'projectId' => $this->projectId->toNative(),
            'title' => $this->title->toNative(),
            'slug' => $this->slug->toNative(),
            'sshUserName' => $this->sshUserName->toNative(),
            'address' => $this->address->toNative(),
            'sshPort' => $this->sshPort->toNative(),
            'sshKeyId' => $this->sshKeyId->toNative(),
        ];
    }

    public function withSlugFromString(string $slug): static
    {
        return $this->with(slug: Slug::fromNative($slug));
    }
}
