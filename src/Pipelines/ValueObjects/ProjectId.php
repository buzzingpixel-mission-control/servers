<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\ValueObjects;

use Funeralzone\ValueObjects\ValueObject;
use MissionControlServers\Servers\ValueObjects\UuidNullable;

class ProjectId implements ValueObject
{
    use UuidNullable;
}
