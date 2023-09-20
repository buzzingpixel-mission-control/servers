<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Persistence;

use MissionControlBackend\ActionResult;
use MissionControlBackend\Persistence\MissionControlPdo;

use function implode;

class AddNewPipelineItems
{
    public function add(
        MissionControlPdo $pdo,
        PipelineItemRecordCollection $items,
    ): ActionResult {
        foreach ($items->records as $record) {
            $statement = $pdo->prepare(implode(
                ' ',
                [
                    'INSERT INTO',
                    $record->tableName(),
                    $record->columnsAsInsertIntoString(),
                    'VALUES',
                    $record->columnsAsValuePlaceholders(),
                ],
            ));

            if (! $statement->execute($record->asParametersArray())) {
                return new ActionResult(
                    false,
                    $pdo->errorInfo(),
                    $pdo->errorCode(),
                );
            }
        }

        return new ActionResult();
    }
}
