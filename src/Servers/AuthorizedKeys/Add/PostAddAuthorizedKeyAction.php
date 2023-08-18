<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\AuthorizedKeys\Add;

use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function assert;
use function is_string;
use function json_decode;

readonly class PostAddAuthorizedKeyAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->post(
            '/servers/{slug}/authorized-keys',
            self::class,
        )->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(
        private AddKeyFactory $addKeyFactory,
        private ResponderFactory $responderFactory,
    ) {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $slug = $request->getAttribute('slug');
        assert(is_string($slug));

        /** @phpstan-ignore-next-line */
        $key = (string) (json_decode(
            (string) $request->getBody(),
            true,
        )['key'] ?? '');

        $status = $this->addKeyFactory->add($slug, $key);

        return $this->responderFactory->create(
            $status,
            $request,
        )->respond($status);
    }
}
