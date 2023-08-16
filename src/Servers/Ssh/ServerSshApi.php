<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\Ssh;

use MissionControlServers\Servers\Server;
use MissionControlServers\Servers\Ssh\AuthorizedKeys\AuthorizedKeyCollection;
use MissionControlServers\Servers\Ssh\AuthorizedKeys\ListAuthorizedKeys;

readonly class ServerSshApi
{
    public function __construct(private ListAuthorizedKeys $listAuthorizedKeys)
    {
    }

    public function listAuthorizedKeys(Server $server): AuthorizedKeyCollection
    {
        return $this->listAuthorizedKeys->listKeys($server);
    }
}
