<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\AuthorizedKeys;

use Psr\Http\Message\ResponseInterface;
use Slim\Psr7\Factory\ResponseFactory;

use function json_encode;

use const JSON_PRETTY_PRINT;

readonly class RespondWithSuccess implements Responder
{
    public function __construct(private ResponseFactory $responseFactory)
    {
    }

    public function respond(Payload $payload): ResponseInterface
    {
        $response = $this->responseFactory->createResponse()->withHeader(
            'Content-type',
            'application/json',
        );

        $response->getBody()->write((string) json_encode(
            $payload->keys->asArray(),
            JSON_PRETTY_PRINT,
        ));

        return $response;
    }
}
