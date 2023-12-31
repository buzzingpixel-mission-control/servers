<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\ValueObjects;

use function array_map;
use function array_values;
use function count;
use function json_encode;

class RunOnServers
{
    /** @var ServerId[] */
    public array $entities;

    /** @param ServerId[] $entities */
    public function __construct(array $entities = [])
    {
        $this->entities = array_values(array_map(
            static fn (ServerId $e) => $e,
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

    /** @return array<array-key, string> */
    public function asArray(): array
    {
        /** @phpstan-ignore-next-line */
        return $this->map(
            static fn (ServerId $e) => $e->toNative(),
        );
    }

    public function asJson(): string
    {
        return (string) json_encode($this->asArray());
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
