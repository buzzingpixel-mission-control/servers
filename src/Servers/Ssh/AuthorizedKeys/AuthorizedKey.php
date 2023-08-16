<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\Ssh\AuthorizedKeys;

use MissionControlServers\Servers\Ssh\AuthorizedKeys\ValueObjects\Key;

readonly class AuthorizedKey
{
    public static function fromString(string $key): self
    {
        return new self(Key::fromNative($key));
    }

    public function __construct(public Key $key)
    {
    }

    /** @return array<array-key, scalar|null> */
    public function asArray(): array
    {
        return ['key' => $this->key->toNative()];
    }
}
