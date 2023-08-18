<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\AuthorizedKeys\Add;

use MissionControlServers\Servers\Persistence\FindServerParameters;
use MissionControlServers\Servers\ServerRepository;
use MissionControlServers\Servers\Ssh\ServerSshApi;
use Throwable;

readonly class AddKeyFactory
{
    public function __construct(
        private ServerSshApi $serverSshApi,
        private ServerRepository $repository,
    ) {
    }

    public function add(
        string $slug,
        string $key,
    ): Status {
        $server = $this->repository->findOneOrNull(
            FindServerParameters::create()->withSlug(
                $slug,
            ),
        );

        if ($server === null) {
            return Status::NOT_FOUND;
        }

        try {
            $this->serverSshApi->addAuthorizedKey($server, $key);

            return Status::SUCCESS;
        } catch (Throwable) {
            return Status::FAILURE;
        }
    }
}
