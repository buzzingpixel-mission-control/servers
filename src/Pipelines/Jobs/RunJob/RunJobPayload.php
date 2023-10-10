<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use MissionControlServers\Pipelines\Jobs\PipelineJob;
use MissionControlServers\Pipelines\Jobs\PipelineJobItem;
use MissionControlServers\Pipelines\Pipeline;
use MissionControlServers\Pipelines\PipelineItem;
use Ramsey\Uuid\UuidInterface;
use Spatie\Cloneable\Cloneable;

use function array_merge;

readonly class RunJobPayload
{
    use Cloneable;

    /** @param string[] $message */
    public function __construct(
        public Pipeline $pipeline,
        public PipelineItem $pipelineItem,
        public PipelineJob $job,
        public PipelineJobItem $jobItem,
        public UuidInterface $serverId,
        public array $message = [],
        public bool $success = true,
    ) {
    }

    public function withServerId(UuidInterface $serverId): self
    {
        return $this->with(serverId: $serverId);
    }

    public function withMessageLine(string $line): self
    {
        return $this->with(message: array_merge(
            $this->message,
            [$line],
        ));
    }

    public function withSuccess(): self
    {
        return $this->with(success: true);
    }

    public function withFailure(): self
    {
        return $this->with(success: false);
    }
}
