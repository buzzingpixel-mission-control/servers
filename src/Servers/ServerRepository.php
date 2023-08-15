<?php

declare(strict_types=1);

namespace MissionControlServers\Servers;

use Cocur\Slugify\Slugify;
use MissionControlBackend\ActionResult;
use MissionControlServers\Servers\Persistence\CreateServer;
use MissionControlServers\Servers\Persistence\FindServerParameters;
use MissionControlServers\Servers\Persistence\FindServers;
use MissionControlServers\Servers\Persistence\SaveServer;
use MissionControlServers\Servers\Persistence\ServerRecord;

readonly class ServerRepository
{
    public function __construct(
        private Slugify $slugify,
        private SaveServer $save,
        private FindServers $find,
        private CreateServer $create,
    ) {
    }

    public function create(NewServer $entity): ActionResult
    {
        return $this->create->create(
            ServerRecord::fromNewEntity(
                $entity->withSlugFromString(
                    $this->slugify->slugify(
                        $entity->title->toNative(),
                    ),
                ),
            ),
        );
    }

    public function save(Server $entity): ActionResult
    {
        return $this->save->save(
            ServerRecord::fromEntity(
                $entity->withSlugFromString(
                    $this->slugify->slugify(
                        $entity->title->toNative(),
                    ),
                ),
            ),
        );
    }

    public function findOne(
        FindServerParameters|null $parameters = null,
    ): Server {
        return Server::fromRecord(
            $this->find->findOne($parameters),
        );
    }

    public function findOneOrNull(
        FindServerParameters|null $parameters = null,
    ): Server|null {
        $record = $this->find->findOneOrNull($parameters);

        if ($record === null) {
            return null;
        }

        return Server::fromRecord($record);
    }

    public function findAll(
        FindServerParameters|null $parameters = null,
    ): ServerCollection {
        $records = $this->find->findAll($parameters);

        /** @phpstan-ignore-next-line */
        return new ServerCollection($records->map(
            static fn (ServerRecord $record) => Server::fromRecord(
                $record,
            )
        ));
    }
}
