<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\Ssh;

use MissionControlServers\Servers\Server;
use MissionControlServers\Servers\Ssh\AddAuthorizedKey\AddAuthorizedKey;
use MissionControlServers\Servers\Ssh\AuthorizedKeys\AuthorizedKeyCollection;
use MissionControlServers\Servers\Ssh\AuthorizedKeys\ListAuthorizedKeys;

readonly class ServerSshApi
{
    public function __construct(
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
}
