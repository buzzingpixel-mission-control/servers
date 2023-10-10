<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use MissionControlBackend\Persistence\UuidFactoryWithOrderedTimeCodec;
use MissionControlServers\Pipelines\Jobs\PipelineJob;
use MissionControlServers\Pipelines\Jobs\PipelineJobItem;
use MissionControlServers\Pipelines\Pipeline;
use MissionControlServers\Pipelines\PipelineItem;
use MissionControlServers\Pipelines\ValueObjects\ServerId;

readonly class RunPipelineItem
{
    public function __construct(
        private UuidFactoryWithOrderedTimeCodec $uuidFactory,
        private RunPipelineItemOnServer $runPipelineItemOnServer,
    ) {
    }

    public function run(
        Pipeline $pipeline,
        PipelineItem $pipelineItem,
        PipelineJob $job,
        PipelineJobItem $jobItem,
    ): Result {
        if ($pipelineItem->runOnServers->isEmpty()) {
            return new Result(
                ['Item has not been assigned to any servers'],
            );
        }

        $payload = new RunJobPayload(
            $pipeline,
            $pipelineItem,
            $job,
            $jobItem,
            $this->uuidFactory->uuid4(),
        );

        $pipelineItem->runOnServers->map(
            function (ServerId $serverId) use (
                &$payload,
            ): void {
                if (! $payload->success) {
                    return;
                }

                $payload = $this->runPipelineItemOnServer->run(
                    $payload->withServerId(
                        $serverId->toUuid(),
                    ),
                );
            },
        );

        return new Result(
            $payload->message,
            $payload->success,
        );
    }
}
