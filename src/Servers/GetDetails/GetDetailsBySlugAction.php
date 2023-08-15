<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\GetDetails;

use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlServers\Servers\Persistence\FindServerParameters;
use MissionControlServers\Servers\ServerRepository;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function assert;
use function is_string;

readonly class GetDetailsBySlugAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->get('/servers/{slug}', self::class)
            ->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(
        private ServerRepository $repository,
        private GetDetailsResponderFactory $responderFactory,
    ) {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $slug = $request->getAttribute('slug');
        assert(is_string($slug));

        return $this->responderFactory->createResponder(
            $request,
            $response,
            $this->repository->findOneOrNull(
                FindServerParameters::create()->withSlug(
                    $slug,
                ),
            ),
        )->respond();
    }
}
