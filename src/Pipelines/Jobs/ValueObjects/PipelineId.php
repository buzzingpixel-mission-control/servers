<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\ValueObjects;

use Funeralzone\ValueObjectExtensions\ComplexScalars\UUIDTrait;
use Funeralzone\ValueObjects\ValueObject;

class PipelineId implements ValueObject
{
    use UUIDTrait;
}
