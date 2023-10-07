<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs;

use function dd;

class PipelineJobItemQueueJob
{
    public function __invoke(array $context): void
    {
        dd($context);
    }
}
