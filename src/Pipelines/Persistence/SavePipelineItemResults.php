<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Persistence;

readonly class SavePipelineItemResults
{
    public function __construct(
        public OrphanedItemIdCollection $orphanedItemIds,
        public PipelineItemRecordCollection $newItems,
        public PipelineItemRecordCollection $existingItems,
    ) {
    }
}
