<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\GetDetails;

use MissionControlServers\Pipelines\Pipeline;
use MissionControlServers\Pipelines\PipelineOutputFactory;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

readonly class GetDetailsResponderFactory
{
    public function __construct(
        private PipelineOutputFactory $outputFactory,
    ) {
    }

    public function createResponder(
        ServerRequestInterface $request,
        ResponseInterface $response,
        Pipeline|null $pipeline,
    ): GetDetailsResponder {
        if ($pipeline === null) {
            return new GetDetailsResponderNotFound($request);
        }

        return new GetDetailsResponderFound(
            $pipeline,
            $response,
            $this->outputFactory,
        );
    }
}
