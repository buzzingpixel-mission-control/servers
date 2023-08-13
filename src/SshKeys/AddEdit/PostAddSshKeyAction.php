<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys\AddEdit;

use MissionControlBackend\ActionResultResponseFactory;
use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Http\JsonResponse\JsonResponder;
use MissionControlIdp\Authorize\RequireAdminMiddleware;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlServers\SshKeys\SshKeyRepository;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function is_array;

readonly class PostAddSshKeyAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->post('/ssh-keys/add', self::class)
            ->add(RequireAdminMiddleware::class)
            ->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(
        private SshKeyRepository $repository,
        private JsonResponder $jsonResponder,
        private ActionResultResponseFactory $responseFactory,
    ) {
    }

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        $rawPostData = $request->getParsedBody();

        $postData = PostedData::fromRawPostData(
            is_array($rawPostData) ? $rawPostData : [],
        );

        return $this->jsonResponder->respond(
            $this->responseFactory->createResponse(
                $this->repository->createSshKey(
                    $this->repository->generateSshKey(
                        $postData->title->toNative(),
                    ),
                ),
            ),
        );
    }
}
