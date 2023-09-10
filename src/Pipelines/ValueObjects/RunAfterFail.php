<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\ValueObjects;

use Funeralzone\ValueObjects\Scalars\BooleanTrait;
use Funeralzone\ValueObjects\ValueObject;

class RunAfterFail implements ValueObject
{
    use BooleanTrait;
}
