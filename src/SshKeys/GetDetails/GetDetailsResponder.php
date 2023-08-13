<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys\GetDetails;

use Psr\Http\Message\ResponseInterface;

interface GetDetailsResponder
{
    public function respond(): ResponseInterface;
}
