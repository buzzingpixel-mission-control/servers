<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\ValueObjects;

use Funeralzone\ValueObjects\ValueObject;

class ProjectId implements ValueObject
{
    use UuidNullable;
}
