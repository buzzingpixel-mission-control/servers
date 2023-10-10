<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use MissionControlServers\Pipelines\Jobs\Specialized\SpecialCases;
use MissionControlServers\Servers\Server;
use MissionControlServers\Servers\ValueObjects\Address;
use MissionControlServers\Servers\ValueObjects\Id;
use MissionControlServers\Servers\ValueObjects\IsActive;
use MissionControlServers\Servers\ValueObjects\ProjectId;
use MissionControlServers\Servers\ValueObjects\Slug;
use MissionControlServers\Servers\ValueObjects\SshKeyId;
use MissionControlServers\Servers\ValueObjects\SshPort;
use MissionControlServers\Servers\ValueObjects\SshUserName;
use MissionControlServers\Servers\ValueObjects\Title;

class LocalShellServerFactory
{
    public function create(): Server
    {
        return new Server(
            Id::fromNative(SpecialCases::LOCAL_SHELL_ID->value),
            IsActive::fromNative(true),
            ProjectId::fromNative(null),
            Title::fromNative(
                SpecialCases::LOCAL_SHELL_NAME->value,
            ),
            Slug::fromNative(
                SpecialCases::LOCAL_SHELL_SLUG->value,
            ),
            SshUserName::fromNative(''),
            Address::fromNative(''),
            SshPort::fromNative(0),
            SshKeyId::fromNative(null),
        );
    }
}
