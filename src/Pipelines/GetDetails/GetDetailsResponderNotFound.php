<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\GetDetails;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpNotFoundException;

readonly class GetDetailsResponderNotFound implements GetDetailsResponder
{
    public function __construct(private ServerRequestInterface $request)
    {
    }

    public function respond(): ResponseInterface
    {
        throw new HttpNotFoundException($this->request);
    }
}
