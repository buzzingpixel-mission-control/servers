<?php

declare(strict_types=1);

namespace MissionControlServers\Servers;

use RuntimeException;

use function array_map;
use function array_values;

class ServerCollection
{
    /** @var Server[] */
    public array $entities;

    /** @param Server[] $entities */
    public function __construct(array $entities = [])
    {
        $this->entities = array_values(array_map(
            static fn (Server $e) => $e,
            $entities,
        ));
    }

    public function first(): Server
    {
        $entity = $this->firstOrNull();

        if ($entity === null) {
            throw new RuntimeException('No server found');
        }

        return $entity;
    }

    public function firstOrNull(): Server|null
    {
        return $this->entities[0] ?? null;
    }

    /** @return mixed[] */
    public function map(callable $callback): array
    {
        return array_values(array_map(
            $callback,
            $this->entities,
        ));
    }

    /** @return array<array-key, array<string, scalar|null>> */
    public function asArray(): array
    {
        /** @phpstan-ignore-next-line */
        return $this->map(
            static fn (Server $e) => $e->asArray(),
        );
    }
}
