<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use MissionControlServers\Servers\Server;
use MissionControlServers\Servers\Ssh\ServerSshApi;

readonly class RunShellCommandOnSshServer implements RunShellCommand
{
    public function __construct(private ServerSshApi $serverSshApi)
    {
    }

    public function runShellCommand(Server $server, string $command): string
    {
        return $this->serverSshApi->runShellCommand(
            $server,
            $command,
        );
    }
}
