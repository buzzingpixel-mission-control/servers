<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs;

use Psr\Http\Message\ResponseInterface;

interface PostRunPipelineResponder
{
    public function respond(): ResponseInterface;
}
