<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\ValueObjects;

use Funeralzone\ValueObjectExtensions\ComplexScalars\UUIDTrait;
use Funeralzone\ValueObjects\ValueObject;

class SecretId implements ValueObject
{
    use UUIDTrait;
}
