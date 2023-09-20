<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Persistence;

use MissionControlBackend\ActionResult;
use MissionControlBackend\Persistence\MissionControlPdo;

use function array_fill;
use function count;
use function implode;

class DeleteOrphanedItems
{
    public function delete(
        MissionControlPdo $pdo,
        OrphanedItemIdCollection $orphanedItemIds,
    ): ActionResult {
        if ($orphanedItemIds->hasNoItems()) {
            return new ActionResult();
        }

        $ids = $orphanedItemIds->ids;

        $in = implode(
            ',',
            array_fill(
                0,
                count($ids),
                '?',
            ),
        );

        $statement = $pdo->prepare(implode(' ', [
            'DELETE FROM',
            PipelineItemRecord::getTableName(),
            'WHERE id IN (' . $in . ')',
        ]));

        if (! $statement->execute($ids)) {
            return new ActionResult(
                false,
                $pdo->errorInfo(),
                $pdo->errorCode(),
            );
        }

        return new ActionResult();
    }
}
