<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use MissionControlServers\Pipelines\Jobs\RunJob\ValueObjects\Description;
use MissionControlServers\Pipelines\Jobs\RunJob\ValueObjects\RunBeforeEveryItem;
use MissionControlServers\Pipelines\Jobs\RunJob\ValueObjects\RunOnServers;
use MissionControlServers\Pipelines\Jobs\RunJob\ValueObjects\Script;
use MissionControlServers\Pipelines\Jobs\RunJob\ValueObjects\ServerSlug;
use MissionControlServers\Pipelines\Jobs\RunJob\ValueObjects\YamlPipelineItem;
use MissionControlServers\Pipelines\Jobs\RunJob\ValueObjects\YamlPipelineItems;

use function array_map;
use function is_array;

class YamlResultTransformer
{
    /** @param mixed[] $yamlArray */
    public function fromArray(array $yamlArray): YamlResult
    {
        $rawItems = $yamlArray['pipelineItems'] ?? [];

        $rawItems = is_array($rawItems) ? $rawItems : [];

        $pipelineItemsArray = array_map(
            static function (array $item): YamlPipelineItem {
                $desc = (string) ($item['description'] ?? '');

                $script = (string) ($item['script'] ?? '');

                $serversRaw = $item['runOnServers'] ?? [];

                $servers = array_map(
                    static function (string $slug): ServerSlug {
                        return ServerSlug::fromNative($slug);
                    },
                    $serversRaw,
                );

                return new YamlPipelineItem(
                    Description::fromNative($desc),
                    Script::fromNative($script),
                    new RunOnServers($servers),
                );
            },
            $rawItems,
        );

        return new YamlResult(
            RunBeforeEveryItem::fromNative(
                (string) ($yamlArray['runBeforeEveryItem'] ?? ''),
            ),
            new YamlPipelineItems($pipelineItemsArray),
        );
    }
}
