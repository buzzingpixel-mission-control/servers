<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines;

use RuntimeException;

use function array_map;
use function array_values;

class PipelineCollection
{
    /** @var Pipeline[] */
    public array $entities;

    /** @param Pipeline[] $entities */
    public function __construct(array $entities = [])
    {
        $this->entities = array_values(array_map(
            static fn (Pipeline $e) => $e,
            $entities,
        ));
    }

    public function first(): Pipeline
    {
        $entity = $this->firstOrNull();

        if ($entity === null) {
            throw new RuntimeException('No Pipeline found');
        }

        return $entity;
    }

    public function firstOrNull(): Pipeline|null
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
            static fn (Pipeline $e) => $e->asArray(),
        );
    }
}
