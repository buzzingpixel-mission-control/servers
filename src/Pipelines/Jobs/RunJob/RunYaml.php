<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use MissionControlServers\Pipelines\Jobs\RunJob\ValueObjects\ServerSlug;
use MissionControlServers\Pipelines\Jobs\RunJob\ValueObjects\YamlPipelineItem;
use MissionControlServers\Servers\Server;

use function implode;

readonly class RunYaml
{
    public function __construct(
        private ParseYaml $parseYaml,
        private PrepareCommand $prepareCommand,
        private RunYamlItemOnServer $runYamlItemOnServer,
        private RunShellCommandFactory $runShellCommandFactory,
    ) {
    }

    public function run(
        RunJobPayload $payload,
        Server $server,
    ): RunJobPayload {
        $path = $this->prepareCommand->prepare(
            $payload->pipelineItem->script->toNative(),
            $payload->job->addedAt->toDateTime(),
        );

        $rawYaml = $this->runShellCommandFactory
            ->create($server)
            ->runShellCommand($server, 'cat ' . $path);

        $yaml = $this->parseYaml->fromString($rawYaml);

        if ($yaml->pipelineItems->isEmpty()) {
            return $payload->withMessageLine(
                'Yaml has no pipeline items',
            );
        }

        $yaml->pipelineItems->map(
            function (YamlPipelineItem $item) use (
                $yaml,
                &$payload,
            ): void {
                if ($item->runOnServers->isEmpty()) {
                    $payload = $payload->withMessageLine(
                        implode(' ', [
                            'Yaml item ',
                            $item->description->toNative(),
                            'has not been assigned to any servers',
                        ]),
                    );

                    return;
                }

                $item->runOnServers->map(
                    function (ServerSlug $serverSlug) use (
                        &$payload,
                        $yaml,
                        $item,
                    ): void {
                        $payload = $this->runYamlItemOnServer->run(
                            $yaml->runBeforeEveryItem,
                            $item,
                            $serverSlug,
                            $payload,
                        );
                    },
                );
            },
        );

        return $payload;
    }
}
