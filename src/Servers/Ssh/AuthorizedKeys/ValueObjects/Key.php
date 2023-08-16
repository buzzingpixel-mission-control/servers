<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\Ssh\AuthorizedKeys\ValueObjects;

use Funeralzone\ValueObjects\Scalars\StringTrait;
use Funeralzone\ValueObjects\ValueObject;

class Key implements ValueObject
{
    use StringTrait;
}
