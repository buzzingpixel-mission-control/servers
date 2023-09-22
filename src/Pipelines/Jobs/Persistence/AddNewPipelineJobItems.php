<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Persistence;

use MissionControlBackend\ActionResult;
use MissionControlBackend\Persistence\MissionControlPdo;

use function implode;

class AddNewPipelineJobItems
{
    public function add(
        MissionControlPdo $pdo,
        PipelineJobItemRecordCollection $items,
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
