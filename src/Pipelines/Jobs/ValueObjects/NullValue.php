<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\ValueObjects;

use Funeralzone\ValueObjects\NullTrait;
use Funeralzone\ValueObjects\ValueObject;

class NullValue implements ValueObject
{
    use NullTrait;
}
