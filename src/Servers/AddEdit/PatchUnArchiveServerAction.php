<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\AddEdit;

use MissionControlBackend\ActionResultResponseFactory;
use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Http\JsonResponse\JsonResponder;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlServers\Servers\Persistence\FindServerParameters;
use MissionControlServers\Servers\ServerRepository;
use MissionControlServers\Servers\ValueObjects\IsActive;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function assert;
use function is_string;

readonly class PatchUnArchiveServerAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->patch('/servers/un-archive/{id}', self::class)
            ->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(
        private ServerRepository $repository,
        private JsonResponder $jsonResponder,
        private ActionResultResponseFactory $responseFactory,
    ) {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $id = $request->getAttribute('id');
        assert(is_string($id));

        $server = $this->repository->findOne(
            FindServerParameters::create()->withId($id),
        );

        return $this->jsonResponder->respond(
            $this->responseFactory->createResponse(
                $this->repository->save(
                    $server->with(isActive: IsActive::fromNative(
                        true,
                    )),
                ),
            ),
        );
    }
}
