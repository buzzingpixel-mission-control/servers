<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Persistence;

use MissionControlBackend\ActionResult;
use MissionControlBackend\Persistence\MissionControlPdo;

use function implode;

readonly class SavePipelineJobItem
{
    public function __construct(private MissionControlPdo $pdo)
    {
    }

    public function save(PipelineJobItemRecord $record): ActionResult
    {
        $statement = $this->pdo->prepare(implode(' ', [
            'UPDATE',
            $record->tableName(),
            'SET',
            $record->columnsAsUpdateSetPlaceholders(),
            'WHERE id = :id',
        ]));

        if (! $statement->execute($record->asParametersArray())) {
            return new ActionResult(
                false,
                $this->pdo->errorInfo(),
                $this->pdo->errorCode(),
            );
        }

        return new ActionResult();
    }
}
