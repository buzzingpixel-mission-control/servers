<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs;

use MissionControlServers\Pipelines\Jobs\Persistence\PipelineJobItemRecord;
use MissionControlServers\Pipelines\Jobs\ValueObjects\FinishedAt;
use MissionControlServers\Pipelines\Jobs\ValueObjects\HasFailed;
use MissionControlServers\Pipelines\Jobs\ValueObjects\Id;
use MissionControlServers\Pipelines\Jobs\ValueObjects\ItemOrder;
use MissionControlServers\Pipelines\Jobs\ValueObjects\LogContent;
use MissionControlServers\Pipelines\Jobs\ValueObjects\NullValue;
use MissionControlServers\Pipelines\Jobs\ValueObjects\PipelineId;
use MissionControlServers\Pipelines\Jobs\ValueObjects\PipelineItemId;
use MissionControlServers\Pipelines\Jobs\ValueObjects\PipelineJobId;
use Spatie\Cloneable\Cloneable;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

class PipelineJobItem
{
    use Cloneable;

    public static function fromRecord(PipelineJobItemRecord $record): self
    {
        if ($record->finished_at === null) {
            $finishedAt = new NullValue();
        } else {
            $finishedAt = FinishedAt::fromNative($record->finished_at);
        }

        return new self(
            Id::fromNative($record->id),
            PipelineId::fromNative($record->pipeline_id),
            PipelineJobId::fromNative(
                $record->pipeline_job_id,
            ),
            PipelineItemId::fromNative(
                $record->pipeline_item_id,
            ),
            ItemOrder::fromNative($record->item_order),
            HasFailed::fromNative($record->has_failed),
            LogContent::fromNative($record->log_content),
            $finishedAt,
        );
    }

    public function __construct(
        public Id $id,
        public PipelineId $pipelineId,
        public PipelineJobId $pipelineJobId,
        public PipelineItemId $pipelineItemId,
        public ItemOrder $itemOrder,
        public HasFailed $hasFailed,
        public LogContent $logContent,
        public FinishedAt|NullValue $finishedAt,
    ) {
    }

    /** @return array<array-key, scalar|array<array-key, string>|null> */
    public function asArray(): array
    {
        return [
            'id' => $this->id->toNative(),
            'pipelineId' => $this->pipelineId->toNative(),
            'pipelineJobId' => $this->pipelineJobId->toNative(),
            'pipelineItemId' => $this->pipelineItemId->toNative(),
            'itemOrder' => $this->itemOrder->toNative(),
            'hasFailed' => $this->hasFailed->toNative(),
            'logContent' => $this->logContent->toNative(),
            'finishedAt' => $this->finishedAt->toNative(),
        ];
    }
}
