<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\AddEdit\ValueObjects;

use Funeralzone\ValueObjects\Scalars\StringTrait;
use Funeralzone\ValueObjects\ValueObject;

class SshKeyId implements ValueObject
{
    use StringTrait;

    public function toNativeOrNull(): string|null
    {
        return $this->string === '' ? null : $this->string;
    }
}
