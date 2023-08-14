<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\ValueObjects;

use Funeralzone\ValueObjects\ValueObject;

class SshKeyId implements ValueObject
{
    use UuidNullable;
}
