<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\GetDetails;

use MissionControlServers\Pipelines\Pipeline;
use MissionControlServers\Pipelines\PipelineOutputFactory;
use Psr\Http\Message\ResponseInterface;

use function json_encode;

use const JSON_PRETTY_PRINT;

readonly class GetDetailsResponderFound implements GetDetailsResponder
{
    public function __construct(
        private Pipeline $pipeline,
        private ResponseInterface $response,
        private PipelineOutputFactory $outputFactory,
    ) {
    }

    public function respond(): ResponseInterface
    {
        $response = $this->response->withHeader(
            'Content-type',
            'application/json',
        );

        $response->getBody()->write((string) json_encode(
            $this->outputFactory->create($this->pipeline),
            JSON_PRETTY_PRINT,
        ));

        return $response;
    }
}
