<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines;

use MissionControlServers\Pipelines\Persistence\PipelineItemRecord;
use MissionControlServers\Pipelines\ValueObjects\Description;
use MissionControlServers\Pipelines\ValueObjects\Id;
use MissionControlServers\Pipelines\ValueObjects\PipelineId;
use MissionControlServers\Pipelines\ValueObjects\RunAfterFail;
use MissionControlServers\Pipelines\ValueObjects\RunOnServers;
use MissionControlServers\Pipelines\ValueObjects\Script;
use MissionControlServers\Pipelines\ValueObjects\ServerId;
use MissionControlServers\Pipelines\ValueObjects\Type;
use Spatie\Cloneable\Cloneable;

use function array_map;
use function is_array;
use function json_decode;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class PipelineItem
{
    use Cloneable;

    public static function fromRecord(PipelineItemRecord $record): self
    {
        $runOnServersRaw = json_decode(
            $record->run_on_servers,
            true,
        );

        $runOnServersRaw = is_array($runOnServersRaw) ?
            $runOnServersRaw :
            [];

        return new self(
            Id::fromNative($record->id),
            PipelineId::fromNative($record->pipeline_id),
            Type::fromNative($record->type),
            Description::fromNative($record->description),
            Script::fromNative($record->script),
            new RunOnServers(array_map(
                static function (string $id): ServerId {
                    return ServerId::fromNative($id);
                },
                $runOnServersRaw,
            )),
            RunAfterFail::fromNative($record->run_after_fail),
        );
    }

    public function __construct(
        public Id $id,
        public PipelineId $pipelineId,
        public Type $type,
        public Description $description,
        public Script $script,
        public RunOnServers $runOnServers,
        public RunAfterFail $runAfterFail,
    ) {
    }

    /** @return array<array-key, scalar|array<array-key, string>|null> */
    public function asArray(): array
    {
        return [
            'id' => $this->id->toNative(),
            'pipelineId' => $this->pipelineId->toNative(),
            'type' => $this->type->toNative(),
            'description' => $this->description->toNative(),
            'script' => $this->script->toNative(),
            'runOnServers' => $this->runOnServers->asArray(),
            'runAfterFail' => $this->runAfterFail->toNative(),
        ];
    }
}
