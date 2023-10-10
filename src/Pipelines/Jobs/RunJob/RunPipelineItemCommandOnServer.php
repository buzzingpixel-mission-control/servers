<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use MissionControlServers\Servers\Server;

use function implode;

use const PHP_EOL;

readonly class RunPipelineItemCommandOnServer
{
    public function __construct(
        private PrepareCommand $prepareCommand,
        private RunShellCommandFactory $runShellCommandFactory,
    ) {
    }

    public function run(
        string $command,
        RunJobPayload $payload,
        Server $server,
    ): RunJobPayload {
        $payload = $payload->withMessageLine(
            'Running on ' . $server->title->toNative(),
        );

        $preppedCommand = $this->prepareCommand->prepare(
            implode(
                PHP_EOL,
                [
                    $payload->pipeline->runBeforeEveryItem->toNative(),
                    $command,
                ],
            ),
            $payload->job->addedAt->toDateTime(),
        );

        $payload = $payload->withMessageLine('Script:');

        $payload = $payload->withMessageLine('```');

        $payload = $payload->withMessageLine($preppedCommand);

        $payload = $payload->withMessageLine('```');

        $commandReturn = $this->runShellCommandFactory
            ->create($server)
            ->runShellCommand($server, $preppedCommand);

        return $payload->withMessageLine($commandReturn);
    }
}
