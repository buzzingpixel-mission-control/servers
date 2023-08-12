<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys\ValueObjects;

use Funeralzone\ValueObjects\Scalars\StringTrait;
use Funeralzone\ValueObjects\ValueObject;

class PrivateKey implements ValueObject
{
    use StringTrait;
}
