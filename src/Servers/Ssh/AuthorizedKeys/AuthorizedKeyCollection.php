<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\Ssh\AuthorizedKeys;

use RuntimeException;

use function array_map;
use function array_values;

class AuthorizedKeyCollection
{
    /** @param string[] $strings */
    public static function fromStrings(array $strings): self
    {
        return new self(array_map(
            static fn (string $s) => AuthorizedKey::fromString($s),
            $strings,
        ));
    }

    /** @var AuthorizedKey[] */
    public array $entities;

    /** @param AuthorizedKey[] $entities */
    public function __construct(array $entities = [])
    {
        $this->entities = array_values(array_map(
            static fn (AuthorizedKey $e) => $e,
            $entities,
        ));
    }

    public function first(): AuthorizedKey
    {
        $entity = $this->firstOrNull();

        if ($entity === null) {
            throw new RuntimeException('No key found');
        }

        return $entity;
    }

    public function firstOrNull(): AuthorizedKey|null
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
            static fn (AuthorizedKey $k) => $k->asArray(),
        );
    }
}
