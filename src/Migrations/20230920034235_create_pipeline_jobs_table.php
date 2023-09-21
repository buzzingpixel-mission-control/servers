<?php

declare(strict_types=1);

use MissionControlBackend\Persistence\Migrations\ChangeMigration;
use MissionControlServers\Pipelines\Jobs\Persistence\PipelineJobsTable;

/** @noinspection PhpUnused */
/** @noinspection PhpIllegalPsrClassPathInspection */
// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace, Squiz.Classes.ClassFileName.NoMatch

class CreatePipelineJobsTable extends ChangeMigration
{
    public function change(): void
    {
        PipelineJobsTable::createSchema($this)->create();
    }
}
