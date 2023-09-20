<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Persistence;

use MissionControlBackend\ActionResult;
use MissionControlBackend\Persistence\MissionControlPdo;

use function implode;

readonly class SavePipelineUpdateMainRecord
{
    public function update(
        MissionControlPdo $pdo,
        PipelineRecord $record,
    ): ActionResult {
        $statement = $pdo->prepare(implode(' ', [
            'UPDATE',
            $record->tableName(),
            'SET',
            $record->columnsAsUpdateSetPlaceholders(),
            'WHERE id = :id',
        ]));

        if (! $statement->execute($record->asParametersArray())) {
            return new ActionResult(
                false,
                $pdo->errorInfo(),
                $pdo->errorCode(),
            );
        }

        return new ActionResult();
    }
}
