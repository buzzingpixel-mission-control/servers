<?php

declare(strict_types=1);

namespace MissionControlServers\Servers;

use MissionControlServers\Servers\ValueObjects\Address;
use MissionControlServers\Servers\ValueObjects\ProjectId;
use MissionControlServers\Servers\ValueObjects\Slug;
use MissionControlServers\Servers\ValueObjects\SshKeyId;
use MissionControlServers\Servers\ValueObjects\SshPort;
use MissionControlServers\Servers\ValueObjects\SshUserName;
use MissionControlServers\Servers\ValueObjects\Title;
use Spatie\Cloneable\Cloneable;

readonly class NewServer
{
    use Cloneable;

    public function __construct(
        public Title $title,
        public SshUserName $sshUserName = new SshUserName(''),
        public Address $address = new Address(''),
        public SshPort $sshPort = new SshPort(0),
        public SshKeyId $sshKeyId = new SshKeyId(null),
        public ProjectId $projectId = new ProjectId(null),
        public Slug $slug = new Slug(''),
    ) {
    }

    public function withSlugFromString(string $slug): static
    {
        return $this->with(slug: Slug::fromNative($slug));
    }
}
