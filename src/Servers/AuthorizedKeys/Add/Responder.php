<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\AuthorizedKeys\Add;

use Psr\Http\Message\ResponseInterface;

interface Responder
{
    public function respond(Status $status): ResponseInterface;
}
