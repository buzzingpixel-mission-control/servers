<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\AddEdit\ValueObjects;

use function array_filter;
use function array_map;
use function is_array;
use function is_scalar;
use function is_string;

readonly class PipelineItem
{
    /** @param array<array-key, scalar|array<array-key, scalar|null>|null> $data */
    public static function fromRawPostData(array $data): self
    {
        $id = $data['id'];
        $id = (string) (is_scalar($id) ? $id : '');

        $type = $data['type'];
        $type = (string) (is_scalar($type) ? $type : '');

        $desc = $data['description'];
        $desc = (string) (is_scalar($desc) ? $desc : '');

        $runOnServers = $data['run_on_servers'];
        $runOnServers = is_array($runOnServers) ? $runOnServers : [];
        $runOnServers = array_filter(
            $runOnServers,
            static fn ($value) => is_string($value)
        );

        $afterFail = $data['run_after_fail'];
        $afterFail = (bool) (is_scalar($afterFail) ? $afterFail : false);

        $script = $data['script'];
        $script = (string) (is_scalar($script) ? $script : '');

        return new self(
            Id::fromNative($id),
            Type::fromNative($type),
            Description::fromNative($desc),
            new RunOnServers(array_map(
                static fn (string $serverId) => ServerId::fromNative(
                    $serverId,
                ),
                $runOnServers,
            )),
            RunAfterFail::fromNative($afterFail),
            Script::fromNative($script),
        );
    }

    public function __construct(
        public Id $id,
        public Type $type,
        public Description $description,
        public RunOnServers $runOnServers,
        public RunAfterFail $runAfterFail,
        public Script $script,
    ) {
    }

    /** @return array<array-key, scalar|array<array-key, string>> */
    public function asArray(): array
    {
        return [
            'id' => $this->id->toNative(),
            'type' => $this->type->toNative(),
            'description' => $this->description->toNative(),
            'runOnServers' => $this->runOnServers->asArray(),
            'runAfterFail' => $this->runAfterFail->toNative(),
            'script' => $this->script->toNative(),
        ];
    }
}
