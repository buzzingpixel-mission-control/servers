<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\Ssh;

use MissionControlServers\Servers\Server;
use MissionControlServers\SshKeys\Persistence\FindSshKeyParameters;
use MissionControlServers\SshKeys\SshKeyRepository;
use phpseclib3\Crypt\RSA;
use phpseclib3\Net\SSH2;
use RuntimeException;

use function implode;

readonly class ConnectionFactory
{
    public function __construct(private SshKeyRepository $sshKeyRepository)
    {
    }

    public function createLoggedInConnection(Server $server): SSH2
    {
        $sshKey = null;

        if (! $server->sshKeyId->isNull()) {
            $sshKey = $this->sshKeyRepository->findOne(
                FindSshKeyParameters::create()
                    /** @phpstan-ignore-next-line */
                    ->withId($server->sshKeyId->toNative()),
            );
        }

        $port = 22;

        if (! $server->sshPort->isNull() && $server->sshPort->toNative() > 0) {
            $port = $server->sshPort->toNative();
        }

        $connection = new SSH2(
            $server->address->toNative(),
            $port,
            10,
        );

        if ($sshKey !== null) {
            $privateKey = RSA::loadPrivateKey(
                $sshKey->private->toNative(),
            );

            $connected = $connection->login(
                $server->sshUserName->toNative(),
                $privateKey,
            );
        } else {
            $connected = $connection->login(
                $server->sshUserName->toNative(),
            );
        }

        if (! $connected) {
            throw new RuntimeException(implode(' ', [
                'Unable to connect to server',
                $server->title->toNative(),
            ]));
        }

        return $connection;
    }
}
