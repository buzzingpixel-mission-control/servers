<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\Ssh\AddAuthorizedKey;

use MissionControlServers\Servers\Server;
use MissionControlServers\Servers\Ssh\ConnectionFactory;

readonly class AddAuthorizedKey
{
    public function __construct(private ConnectionFactory $connectionFactory)
    {
    }

    public function add(Server $server, string $key): void
    {
        $connection = $this->connectionFactory->createLoggedInConnection(
            $server,
        );

        /** @phpstan-ignore-next-line */
        $keyExists = ! empty($connection->exec(
            'grep "' . $key . '" ~/.ssh/authorized_keys;',
        ));

        if ($keyExists) {
            return;
        }

        $connection->exec(
            'echo "' . $key . '" >> ~/.ssh/authorized_keys;',
        );
    }
}
