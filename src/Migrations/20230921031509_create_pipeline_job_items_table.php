<?php

declare(strict_types=1);

use MissionControlBackend\Persistence\Migrations\ChangeMigration;
use MissionControlServers\Pipelines\Jobs\Persistence\PipelineJobItemsTable;

/** @noinspection PhpUnused */
/** @noinspection PhpIllegalPsrClassPathInspection */
// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace, Squiz.Classes.ClassFileName.NoMatch

class CreatePipelineJobItemsTable extends ChangeMigration
{
    public function change(): void
    {
        PipelineJobItemsTable::createSchema($this)->create();
    }
}
