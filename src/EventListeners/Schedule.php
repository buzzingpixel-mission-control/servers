<?php

declare(strict_types=1);

namespace MissionControlServers\EventListeners;

use MissionControlBackend\Scheduler\ApplyScheduleEvent;

class Schedule
{
    public function onApplySchedule(ApplyScheduleEvent $event): void
    {
    }
}
