<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys\GetDetails;

use MissionControlServers\SshKeys\SshKey;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class GetDetailsResponderFactory
{
    public function createResponder(
        ServerRequestInterface $request,
        ResponseInterface $response,
        SshKey|null $sshKey,
    ): GetDetailsResponder {
        if ($sshKey === null) {
            return new GetDetailsResponderNotFound($request);
        }

        return new GetDetailsResponderFound(
            $sshKey,
            $response,
        );
    }
}
