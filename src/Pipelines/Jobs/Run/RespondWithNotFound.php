<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Run;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpNotFoundException;

readonly class RespondWithNotFound implements Responder
{
    public function __construct(private ServerRequestInterface $request)
    {
    }

    public function respond(): ResponseInterface
    {
        throw new HttpNotFoundException($this->request);
    }
}
