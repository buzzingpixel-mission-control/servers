<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\AuthorizedKeys\Add;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpNotFoundException;

readonly class RespondWithNotFound implements Responder
{
    public function __construct(private ServerRequestInterface $request)
    {
    }

    public function respond(Status $status): ResponseInterface
    {
        throw new HttpNotFoundException($this->request);
    }
}
