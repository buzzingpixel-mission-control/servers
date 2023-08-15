<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\AddEdit;

use MissionControlServers\Servers\AddEdit\ValueObjects\Address;
use MissionControlServers\Servers\AddEdit\ValueObjects\ProjectId;
use MissionControlServers\Servers\AddEdit\ValueObjects\SshKeyId;
use MissionControlServers\Servers\AddEdit\ValueObjects\SshPort;
use MissionControlServers\Servers\AddEdit\ValueObjects\SshUserName;
use MissionControlServers\Servers\AddEdit\ValueObjects\Title;

readonly class PostedData
{
    /** @param string[] $data */
    public static function fromRawPostData(array $data): self
    {
        return new self(
            Title::fromNative($data['title'] ?? ''),
            SshUserName::fromNative(
                $data['ssh_user_name'] ?? '',
            ),
            Address::fromNative($data['address'] ?? ''),
            SshPort::fromString($data['ssh_port'] ?? ''),
            SshKeyId::fromNative($data['ssh_key_id'] ?? ''),
            ProjectId::fromNative($data['project_id'] ?? ''),
        );
    }

    public function __construct(
        public Title $title,
        public SshUserName $sshUserName,
        public Address $address,
        public SshPort $sshPort,
        public SshKeyId $sshKeyId,
        public ProjectId $projectId,
    ) {
    }
}
