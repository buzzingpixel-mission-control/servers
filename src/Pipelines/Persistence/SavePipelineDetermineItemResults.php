<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Persistence;

use MissionControlBackend\Persistence\MissionControlPdo;

use function array_filter;
use function array_map;
use function implode;
use function in_array;

readonly class SavePipelineDetermineItemResults
{
    public function __construct(private MissionControlPdo $pdo)
    {
    }

    public function determine(PipelineRecord $record): SavePipelineItemResults
    {
        $incomingItemIds = $record->pipelineItems()->map(
            static fn (PipelineItemRecord $i) => $i->id,
        );

        $currentItemsStatement = $this->pdo->prepare(implode(
            ' ',
            [
                'SELECT id FROM',
                PipelineItemRecord::getTableName(),
                'WHERE pipeline_id = :pipeline_id',
            ],
        ));

        $currentItemsStatement->execute([
            'pipeline_id' => $record->id,
        ]);

        $currentItems = $currentItemsStatement->fetchAll();

        $currentItemIds = array_map(
            static fn (array $item) => $item['id'],
            $currentItems,
        );

        $orphanedItemIds = array_filter(
            $currentItemIds,
            static fn (string $id) => ! in_array(
                $id,
                $incomingItemIds,
                true,
            ),
        );

        $newItems = $record->pipelineItems()->filter(
            static fn (PipelineItemRecord $r) => ! in_array(
                $r->id,
                $currentItemIds,
                true,
            )
        );

        $existingItems = $record->pipelineItems()->filter(
            static fn (PipelineItemRecord $r) => in_array(
                $r->id,
                $currentItemIds,
                true,
            )
        );

        return new SavePipelineItemResults(
            new OrphanedItemIdCollection(
                $orphanedItemIds,
            ),
            $newItems,
            $existingItems,
        );
    }
}
