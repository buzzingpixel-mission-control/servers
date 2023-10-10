<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use MissionControlServers\Pipelines\Jobs\RunJob\ValueObjects\RunBeforeEveryItem;
use MissionControlServers\Pipelines\Jobs\RunJob\ValueObjects\YamlPipelineItems;

readonly class YamlResult
{
    public function __construct(
        public RunBeforeEveryItem $runBeforeEveryItem,
        public YamlPipelineItems $pipelineItems,
    ) {
    }
}
