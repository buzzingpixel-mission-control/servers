<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\ValueObjects;

use DateTimeImmutable;
use Funeralzone\ValueObjects\ValueObject;
use MissionControlBackend\Persistence\ValueObjects\DbDateTime;

class AddedAt implements ValueObject
{
    use DbDateTime;

    public function toDateTime(): DateTimeImmutable
    {
        return $this->date;
    }
}
