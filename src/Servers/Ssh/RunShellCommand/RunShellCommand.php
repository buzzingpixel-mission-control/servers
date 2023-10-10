<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\Ssh\RunShellCommand;

use MissionControlServers\Servers\Server;
use MissionControlServers\Servers\Ssh\ConnectionFactory;

readonly class RunShellCommand
{
    public function __construct(private ConnectionFactory $connectionFactory)
    {
    }

    public function run(Server $server, string $command): string
    {
        $connection = $this->connectionFactory->createLoggedInConnection(
            $server,
        );

        return (string) $connection->exec($command);
    }
}
