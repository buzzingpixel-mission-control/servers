<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\AddEdit\ValueObjects;

use Funeralzone\ValueObjects\Scalars\IntegerTrait;
use Funeralzone\ValueObjects\ValueObject;

class SshPort implements ValueObject
{
    use IntegerTrait;

    public static function fromStringOrInt(string|int $value): self
    {
        return new self((int) $value);
    }
}
