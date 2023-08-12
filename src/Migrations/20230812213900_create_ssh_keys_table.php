<?php

declare(strict_types=1);

use MissionControlBackend\Persistence\Migrations\ChangeMigration;
use MissionControlServers\SshKeys\Persistence\SshKeysTable;

/** @noinspection PhpUnused */
/** @noinspection PhpIllegalPsrClassPathInspection */
// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace, Squiz.Classes.ClassFileName.NoMatch

class CreateSshKeysTable extends ChangeMigration
{
    public function change(): void
    {
        SshKeysTable::createSchema($this)->create();
    }
}
