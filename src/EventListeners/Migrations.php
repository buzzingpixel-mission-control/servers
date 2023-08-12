<?php

declare(strict_types=1);

namespace MissionControlServers\EventListeners;

use MissionControlBackend\Persistence\Migrations\AddMigrationPathsEvent;
use MissionControlServers\ServersSrc;

class Migrations
{
    public function onAddMigrationPaths(AddMigrationPathsEvent $event): void
    {
        $event->paths->addPathFromString(
            ServersSrc::path() . '/Migrations',
        );
    }
}
