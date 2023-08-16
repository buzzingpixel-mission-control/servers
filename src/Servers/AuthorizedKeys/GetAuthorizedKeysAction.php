<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\AuthorizedKeys;

use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function assert;
use function is_string;

readonly class GetAuthorizedKeysAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->get(
            '/servers/{slug}/authorized-keys',
            self::class,
        )->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(
        private GetKeysFactory $getKeysFactory,
        private ResponderFactory $responderFactory,
    ) {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $slug = $request->getAttribute('slug');
        assert(is_string($slug));

        $payload = $this->getKeysFactory->get($slug);

        return $this->responderFactory->create(
            $payload,
            $request,
        )->respond($payload);
    }
}
