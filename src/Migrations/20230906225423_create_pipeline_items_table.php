<?php

declare(strict_types=1);

use MissionControlBackend\Persistence\Migrations\ChangeMigration;
use MissionControlServers\Pipelines\Persistence\PipelineItemsTable;

/** @noinspection PhpUnused */
/** @noinspection PhpIllegalPsrClassPathInspection */
// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace, Squiz.Classes.ClassFileName.NoMatch

class CreatePipelineItemsTable extends ChangeMigration
{
    public function change(): void
    {
        PipelineItemsTable::createSchema($this)->create();
    }
}
