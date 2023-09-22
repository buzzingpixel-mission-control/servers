<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs;

use MissionControlServers\Pipelines\Jobs\Persistence\PipelineJobItemRecord;
use MissionControlServers\Pipelines\Jobs\Persistence\PipelineJobRecord;
use MissionControlServers\Pipelines\Jobs\ValueObjects\AddedAt;
use MissionControlServers\Pipelines\Jobs\ValueObjects\FinishedAt;
use MissionControlServers\Pipelines\Jobs\ValueObjects\HasFailed;
use MissionControlServers\Pipelines\Jobs\ValueObjects\HasStarted;
use MissionControlServers\Pipelines\Jobs\ValueObjects\Id;
use MissionControlServers\Pipelines\Jobs\ValueObjects\IsFinished;
use MissionControlServers\Pipelines\Jobs\ValueObjects\NullValue;
use MissionControlServers\Pipelines\Jobs\ValueObjects\PercentComplete;
use MissionControlServers\Pipelines\Jobs\ValueObjects\PipelineId;
use Spatie\Cloneable\Cloneable;

use function array_map;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class PipelineJob
{
    use Cloneable;

    public static function fromRecord(PipelineJobRecord $record): self
    {
        if ($record->finished_at === null) {
            $finishedAt = new NullValue();
        } else {
            $finishedAt = FinishedAt::fromNative($record->finished_at);
        }

        return new self(
            Id::fromNative($record->id),
            PipelineId::fromNative($record->pipeline_id),
            HasStarted::fromNative($record->has_started),
            IsFinished::fromNative($record->is_finished),
            HasFailed::fromNative($record->has_failed),
            PercentComplete::fromNative(
                $record->percent_complete,
            ),
            AddedAt::fromNative($record->added_at),
            $finishedAt,
            new PipelineJobItemCollection(array_map(
                static function (
                    PipelineJobItemRecord $record,
                ): PipelineJobItem {
                    return PipelineJobItem::fromRecord($record);
                },
                $record->pipelineJobItems()->records,
            )),
        );
    }

    public function __construct(
        public Id $id,
        public PipelineId $pipelineId,
        public HasStarted $hasStarted,
        public IsFinished $isFinished,
        public HasFailed $hasFailed,
        public PercentComplete $percentComplete,
        public AddedAt $addedAt,
        public FinishedAt|NullValue $finishedAt,
        public PipelineJobItemCollection $pipelineJobItems = new PipelineJobItemCollection(),
    ) {
    }

    /** @return array<string, scalar|array<array-key, array<string, scalar|null>>|null> */
    public function asArray(): array
    {
        return [
            'id' => $this->id->toNative(),
            'pipelineId' => $this->pipelineId->toNative(),
            'hasStarted' => $this->hasStarted->toNative(),
            'isFinished' => $this->isFinished->toNative(),
            'hasFailed' => $this->hasFailed->toNative(),
            'percentComplete' => $this->percentComplete->toNative(),
            'addedAt' => $this->addedAt->toNative(),
            'finishedAt' => $this->finishedAt->toNative(),
            'pipelineJobItems' => $this->pipelineJobItems->asArray(),
        ];
    }

    public function withResetPipelineJobItems(): static
    {
        return $this->with(pipelineJobItems: new PipelineJobItemCollection());
    }

    public function withPipelineJobItems(
        PipelineJobItemCollection $items,
    ): static {
        return $this->with(pipelineJobItems: $items);
    }

    public function withPipelineJobItem(PipelineJobItem $item): static
    {
        return $this->withPipelineJobItems(
            $this->pipelineJobItems->withPipelineJobItem($item),
        );
    }
}
