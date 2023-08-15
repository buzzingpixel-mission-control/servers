<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\GetDetails;

use MissionControlServers\Servers\Server;
use Psr\Http\Message\ResponseInterface;

use function json_encode;

use const JSON_PRETTY_PRINT;

readonly class GetDetailsResponderFound implements GetDetailsResponder
{
    public function __construct(
        private Server $server,
        private ResponseInterface $response,
    ) {
    }

    public function respond(): ResponseInterface
    {
        $response = $this->response->withHeader(
            'Content-type',
            'application/json',
        );

        $response->getBody()->write((string) json_encode(
            $this->server->asArray(),
            JSON_PRETTY_PRINT,
        ));

        return $response;
    }
}
