<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\ValueObjects;

use Funeralzone\ValueObjects\Scalars\BooleanTrait;
use Funeralzone\ValueObjects\ValueObject;

class IsFinished implements ValueObject
{
    use BooleanTrait;
}
