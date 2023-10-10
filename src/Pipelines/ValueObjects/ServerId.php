<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\ValueObjects;

use Funeralzone\ValueObjectExtensions\ComplexScalars\UUIDTrait;
use Funeralzone\ValueObjects\ValueObject;
use Ramsey\Uuid\UuidInterface;

class ServerId implements ValueObject
{
    use UUIDTrait;

    public function toUuid(): UuidInterface
    {
        return $this->uuid;
    }
}
