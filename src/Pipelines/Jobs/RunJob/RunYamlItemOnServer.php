<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use MissionControlServers\Pipelines\Jobs\RunJob\ValueObjects\RunBeforeEveryItem;
use MissionControlServers\Pipelines\Jobs\RunJob\ValueObjects\ServerSlug;
use MissionControlServers\Pipelines\Jobs\RunJob\ValueObjects\YamlPipelineItem;
use MissionControlServers\Pipelines\Jobs\Specialized\SpecialCases;
use MissionControlServers\Servers\Persistence\FindServerParameters;
use MissionControlServers\Servers\ServerRepository;

use function implode;

use const PHP_EOL;

readonly class RunYamlItemOnServer
{
    public function __construct(
        private ServerRepository $repository,
        private PrepareCommand $prepareCommand,
        private LocalShellServerFactory $localShell,
        private RunShellCommandFactory $runShellCommandFactory,
    ) {
    }

    public function run(
        RunBeforeEveryItem $runBeforeEveryItem,
        YamlPipelineItem $yamlPipelineItem,
        ServerSlug $serverSlug,
        RunJobPayload $payload,
    ): RunJobPayload {
        $server = match ($serverSlug->toNative()) {
            SpecialCases::LOCAL_SHELL_SLUG->value => $this->localShell->create(),
            default => $this->repository->findOne(
                FindServerParameters::create()->withSlug(
                    $serverSlug->toNative(),
                ),
            ),
        };

        $payload = $payload->withMessageLine(
            'Running on ' . $server->title->toNative(),
        );

        $preppedCommand = $this->prepareCommand->prepare(
            implode(
                PHP_EOL,
                [
                    $payload->pipeline->runBeforeEveryItem->toNative(),
                    $runBeforeEveryItem->toNative(),
                    $yamlPipelineItem->script->toNative(),
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
