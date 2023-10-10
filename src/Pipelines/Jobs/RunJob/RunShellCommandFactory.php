<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use MissionControlServers\Pipelines\Jobs\Specialized\SpecialCases;
use MissionControlServers\Servers\Server;

readonly class RunShellCommandFactory
{
    public function __construct(
        private RunShellCommandOnSshServer $sshServer,
        private RunShellCommandOnLocalShell $localShell,
    ) {
    }

    public function create(Server $server): RunShellCommand
    {
        return match ($server->id->toNative()) {
            SpecialCases::LOCAL_SHELL_ID->value => $this->localShell,
            default => $this->sshServer,
        };
    }
}
