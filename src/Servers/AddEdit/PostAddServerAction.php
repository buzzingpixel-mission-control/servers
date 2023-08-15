<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\AddEdit;

use MissionControlBackend\ActionResultResponseFactory;
use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Http\JsonResponse\JsonResponder;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlServers\Servers\NewServer;
use MissionControlServers\Servers\ServerRepository;
use MissionControlServers\Servers\ValueObjects\Address;
use MissionControlServers\Servers\ValueObjects\ProjectId;
use MissionControlServers\Servers\ValueObjects\SshKeyId;
use MissionControlServers\Servers\ValueObjects\SshPort;
use MissionControlServers\Servers\ValueObjects\SshUserName;
use MissionControlServers\Servers\ValueObjects\Title;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function is_array;

readonly class PostAddServerAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->post('/servers/add', self::class)
            ->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(
        private ServerRepository $repository,
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
                $this->repository->create(
                    new NewServer(
                        Title::fromNative(
                            $postData->title->toNative(),
                        ),
                        SshUserName::fromNative(
                            $postData->sshUserName->toNative(),
                        ),
                        Address::fromNative(
                            $postData->address->toNative(),
                        ),
                        SshPort::fromNative(
                            $postData->sshPort->toNative(),
                        ),
                        SshKeyId::fromNative(
                            $postData->sshKeyId->toNativeOrNull(),
                        ),
                        ProjectId::fromNative(
                            $postData->projectId->toNativeOrNull(),
                        ),
                    ),
                ),
            ),
        );
    }
}
