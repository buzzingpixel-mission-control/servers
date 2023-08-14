<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\ValueObjects;

use Funeralzone\ValueObjects\Scalars\IntegerTrait;
use Funeralzone\ValueObjects\ValueObject;

class SshPort implements ValueObject
{
    use IntegerTrait;
}
