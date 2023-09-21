<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs;

use Psr\Http\Message\ResponseInterface;

use function json_encode;

use const JSON_PRETTY_PRINT;

readonly class PostRunPipelineResponderAlreadyRunning implements PostRunPipelineResponder
{
    public function __construct(private ResponseInterface $response)
    {
    }

    public function respond(): ResponseInterface
    {
        $response = $this->response->withHeader(
            'Content-type',
            'application/json',
        );

        $response->getBody()->write((string) json_encode(
            [
                'success' => false,
                'message' => 'alreadyRunning',
            ],
            JSON_PRETTY_PRINT,
        ));

        return $response;
    }
}
