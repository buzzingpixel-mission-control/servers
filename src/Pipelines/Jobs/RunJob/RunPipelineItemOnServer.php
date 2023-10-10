<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use MissionControlServers\Pipelines\Jobs\Specialized\SpecialCases;
use MissionControlServers\Servers\Persistence\FindServerParameters;
use MissionControlServers\Servers\ServerRepository;

readonly class RunPipelineItemOnServer
{
    public function __construct(
        private RunYaml $runYaml,
        private ServerRepository $repository,
        private LocalShellServerFactory $localShell,
        private RunPipelineItemCommandOnServer $runPipelineItemCommandOnServer,
    ) {
    }

    public function run(RunJobPayload $payload): RunJobPayload
    {
        $server = match ($payload->serverId->toString()) {
            SpecialCases::LOCAL_SHELL_ID->value => $this->localShell->create(),
            default => $this->repository->findOne(
                FindServerParameters::create()->withId(
                    $payload->serverId->toString(),
                ),
            ),
        };

        $type = $payload->pipelineItem->type->toNative();

        return match ($type) {
            'code' => $this->runPipelineItemCommandOnServer->run(
                $payload->pipelineItem->script->toNative(),
                $payload,
                $server,
            ),
            'source' => $this->runYaml->run($payload, $server),
            default => $payload->withFailure()->withMessageLine(
                'Item type "' . $type . '" is not supported',
            ),
        };
    }
}
