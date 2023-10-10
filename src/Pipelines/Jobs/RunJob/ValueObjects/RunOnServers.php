<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob\ValueObjects;

use function array_map;
use function array_values;
use function count;

class RunOnServers
{
    /** @var ServerSlug[] */
    public array $entities;

    /** @param ServerSlug[] $entities */
    public function __construct(array $entities = [])
    {
        $this->entities = array_values(array_map(
            static fn (ServerSlug $e) => $e,
            $entities,
        ));
    }

    /** @return mixed[] */
    public function map(callable $callback): array
    {
        return array_values(array_map(
            $callback,
            $this->entities,
        ));
    }

    public function count(): int
    {
        return count($this->entities);
    }

    public function isEmpty(): bool
    {
        return $this->count() < 1;
    }
}
