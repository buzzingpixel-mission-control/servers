<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\AuthorizedKeys;

use MissionControlServers\Servers\Persistence\FindServerParameters;
use MissionControlServers\Servers\ServerRepository;
use MissionControlServers\Servers\Ssh\ServerSshApi;
use Throwable;

readonly class GetKeysFactory
{
    public function __construct(
        private ServerSshApi $serverSshApi,
        private ServerRepository $repository,
    ) {
    }

    public function get(string $slug): Payload
    {
        $server = $this->repository->findOneOrNull(
            FindServerParameters::create()->withSlug(
                $slug,
            ),
        );

        if ($server === null) {
            return new Payload(Status::NOT_FOUND);
        }

        try {
            $keys = $this->serverSshApi->listAuthorizedKeys($server);

            return new Payload(Status::SUCCESS, $keys);
        } catch (Throwable) {
            return new Payload(Status::FAILURE);
        }
    }
}
