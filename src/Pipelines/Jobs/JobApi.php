<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs;

use MissionControlBackend\ActionResult;
use MissionControlServers\Pipelines\Pipeline;

use function dd;

readonly class JobApi
{
    public function runPipelineIfNotRunning(Pipeline $pipeline): ActionResult
    {
        // TODO: Implement this method
        dd($pipeline);
    }
}
