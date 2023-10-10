<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use MissionControlServers\Servers\Server;

interface RunShellCommand
{
    public function runShellCommand(Server $server, string $command): string;
}
