<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Run;

use MissionControlServers\Pipelines\Jobs\PipelineJob;
use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Http\Message\ResponseInterface;

use function json_encode;

use const JSON_PRETTY_PRINT;

readonly class RespondWithJson implements Responder
{
    public function __construct(
        private PipelineJob $pipelineJob,
        private ResponseFactoryInterface $responseFactory,
    ) {
    }

    public function respond(): ResponseInterface
    {
        $response = $this->responseFactory->createResponse()->withHeader(
            'Content-type',
            'application/json',
        );

        $response->getBody()->write((string) json_encode(
            $this->pipelineJob->asArray('items'),
            JSON_PRETTY_PRINT,
        ));

        return $response;
    }
}
