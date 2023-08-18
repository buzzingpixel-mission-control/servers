<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\AuthorizedKeys\Add;

use Psr\Http\Message\ServerRequestInterface;

readonly class ResponderFactory
{
    public function __construct(
        private RespondWithFailure $failure,
        private RespondWithSuccess $success,
    ) {
    }

    public function create(
        Status $status,
        ServerRequestInterface $request,
    ): Responder {
        if ($status->name === Status::NOT_FOUND->name) {
            return new RespondWithNotFound($request);
        }

        if ($status->name === Status::FAILURE->name) {
            return $this->failure;
        }

        return $this->success;
    }
}
