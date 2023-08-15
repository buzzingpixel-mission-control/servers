<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\GetDetails;

use MissionControlServers\Servers\Server;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class GetDetailsResponderFactory
{
    public function createResponder(
        ServerRequestInterface $request,
        ResponseInterface $response,
        Server|null $server,
    ): GetDetailsResponder {
        if ($server === null) {
            return new GetDetailsResponderNotFound($request);
        }

        return new GetDetailsResponderFound(
            $server,
            $response,
        );
    }
}
