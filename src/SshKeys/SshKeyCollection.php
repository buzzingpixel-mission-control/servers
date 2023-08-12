<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys;

use RuntimeException;

use function array_map;
use function array_values;

class SshKeyCollection
{
    /** @var SshKey[] */
    public array $entities;

    /** @param SshKey[] $entities */
    public function __construct(array $entities = [])
    {
        $this->entities = array_values(array_map(
            static fn (SshKey $p) => $p,
            $entities,
        ));
    }

    public function first(): SshKey
    {
        $entity = $this->firstOrNull();

        if ($entity === null) {
            throw new RuntimeException('No SSH key found');
        }

        return $entity;
    }

    public function firstOrNull(): SshKey|null
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
            static fn (SshKey $p) => $p->asArray(),
        );
    }
}
