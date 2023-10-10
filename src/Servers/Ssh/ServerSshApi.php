<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\Ssh;

use MissionControlServers\Servers\Server;
use MissionControlServers\Servers\Ssh\AddAuthorizedKey\AddAuthorizedKey;
use MissionControlServers\Servers\Ssh\AuthorizedKeys\AuthorizedKeyCollection;
use MissionControlServers\Servers\Ssh\AuthorizedKeys\ListAuthorizedKeys;
use MissionControlServers\Servers\Ssh\RunShellCommand\RunShellCommand;

readonly class ServerSshApi
{
    public function __construct(
        private RunShellCommand $runShellCommand,
        private AddAuthorizedKey $addAuthorizedKey,
        private ListAuthorizedKeys $listAuthorizedKeys,
    ) {
    }

    public function addAuthorizedKey(Server $server, string $key): void
    {
        $this->addAuthorizedKey->add($server, $key);
    }

    public function listAuthorizedKeys(Server $server): AuthorizedKeyCollection
    {
        return $this->listAuthorizedKeys->listKeys($server);
    }

    public function runShellCommand(Server $server, string $command): string
    {
        return $this->runShellCommand->run(
            $server,
            $command,
        );
    }
}
