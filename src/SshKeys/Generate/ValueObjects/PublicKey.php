<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys\Generate\ValueObjects;

use Funeralzone\ValueObjects\Scalars\StringTrait;
use Funeralzone\ValueObjects\ValueObject;

class PublicKey implements ValueObject
{
    use StringTrait;
}
