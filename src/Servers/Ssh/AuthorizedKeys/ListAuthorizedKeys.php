<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\Ssh\AuthorizedKeys;

use MissionControlServers\Servers\Server;
use MissionControlServers\Servers\Ssh\ConnectionFactory;

use function explode;
use function trim;

readonly class ListAuthorizedKeys
{
    public function __construct(private ConnectionFactory $connectionFactory)
    {
    }

    public function listKeys(Server $server): AuthorizedKeyCollection
    {
        $connection = $this->connectionFactory->createLoggedInConnection(
            $server,
        );

        $keysString = (string) $connection->exec(
            'cat ~/.ssh/authorized_keys',
        );

        $keysString = trim($keysString);

        $keysArray = explode("\n", $keysString);

        return AuthorizedKeyCollection::fromStrings($keysArray);
    }
}
