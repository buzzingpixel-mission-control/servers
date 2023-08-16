<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\AuthorizedKeys;

use Psr\Http\Message\ServerRequestInterface;

readonly class ResponderFactory
{
    public function __construct(
        private RespondWithFailure $failure,
        private RespondWithSuccess $success,
    ) {
    }

    public function create(
        Payload $payload,
        ServerRequestInterface $request,
    ): Responder {
        if ($payload->status->name === Status::NOT_FOUND->name) {
            return new RespondWithNotFound($request);
        }

        if ($payload->status->name === Status::FAILURE->name) {
            return $this->failure;
        }

        return $this->success;
    }
}
