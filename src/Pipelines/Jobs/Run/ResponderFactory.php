<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Run;

use MissionControlServers\Pipelines\Jobs\PipelineJob;
use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Http\Message\ServerRequestInterface;

readonly class ResponderFactory
{
    public function __construct(
        private ResponseFactoryInterface $responseFactory,
    ) {
    }

    public function create(
        PipelineJob|null $pipelineJob,
        ServerRequestInterface $request,
    ): Responder {
        if ($pipelineJob === null) {
            return new RespondWithNotFound($request);
        }

        return new RespondWithJson(
            $pipelineJob,
            $this->responseFactory,
        );
    }
}
