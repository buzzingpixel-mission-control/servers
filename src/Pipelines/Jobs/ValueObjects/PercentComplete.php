<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\ValueObjects;

use Funeralzone\ValueObjects\Scalars\FloatTrait;
use Funeralzone\ValueObjects\ValueObject;

class PercentComplete implements ValueObject
{
    use FloatTrait;
}
