<?php

declare(strict_types=1);

use MissionControlBackend\Persistence\Migrations\ChangeMigration;
use MissionControlServers\Servers\Persistence\ServersTable;

/** @noinspection PhpUnused */
/** @noinspection PhpIllegalPsrClassPathInspection */
// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace, Squiz.Classes.ClassFileName.NoMatch

class CreateServersTable extends ChangeMigration
{
    public function change(): void
    {
        ServersTable::createSchema($this)->create();
    }
}
