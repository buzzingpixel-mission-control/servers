<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use MissionControlServers\Servers\Server;

use function exec;
use function implode;

use const PHP_EOL;

class RunShellCommandOnLocalShell implements RunShellCommand
{
    public function runShellCommand(Server $server, string $command): string
    {
        exec(
            $command,
            $output,
        );

        return implode(
            PHP_EOL,
            $output,
        );
    }
}
