<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\AuthorizedKeys;

use Psr\Http\Message\ResponseInterface;

interface Responder
{
    public function respond(Payload $payload): ResponseInterface;
}
