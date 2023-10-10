<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob\ValueObjects;

readonly class YamlPipelineItem
{
    public function __construct(
        public Description $description,
        public Script $script,
        public RunOnServers $runOnServers,
    ) {
    }
}
