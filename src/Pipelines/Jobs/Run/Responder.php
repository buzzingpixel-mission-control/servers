<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Run;

use Psr\Http\Message\ResponseInterface;

interface Responder
{
    public function respond(): ResponseInterface;
}
