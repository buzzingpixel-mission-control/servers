<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\AddEdit;

use MissionControlBackend\ActionResultResponseFactory;
use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Http\JsonResponse\JsonResponder;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlServers\Servers\Persistence\FindServerParameters;
use MissionControlServers\Servers\ServerRepository;
use MissionControlServers\Servers\ValueObjects\Address;
use MissionControlServers\Servers\ValueObjects\ProjectId;
use MissionControlServers\Servers\ValueObjects\SshKeyId;
use MissionControlServers\Servers\ValueObjects\SshPort;
use MissionControlServers\Servers\ValueObjects\SshUserName;
use MissionControlServers\Servers\ValueObjects\Title;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function assert;
use function is_array;
use function is_string;

class PatchEditServerAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->patch('/servers/{slug}', self::class)
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
        $slug = $request->getAttribute('slug');
        assert(is_string($slug));

        $server = $this->repository->findOne(
            FindServerParameters::create()->withSlug($slug),
        );

        $rawPostData = $request->getParsedBody();

        $postData = PostedData::fromRawPostData(
            is_array($rawPostData) ? $rawPostData : [],
        );

        return $this->jsonResponder->respond(
            $this->responseFactory->createResponse(
                $this->repository->save(
                    $server->with(title: Title::fromNative(
                        $postData->title->toNative(),
                    ))->with(sshUserName: SshUserName::fromNative(
                        $postData->sshUserName->toNative(),
                    ))->with(address: Address::fromNative(
                        $postData->address->toNative(),
                    ))->with(sshPort: SshPort::fromNative(
                        $postData->sshPort->toNative(),
                    ))->with(sshKeyId: SshKeyId::fromNative(
                        $postData->sshKeyId->toNativeOrNull(),
                    ))->with(projectId: ProjectId::fromNative(
                        $postData->projectId->toNativeOrNull(),
                    )),
                ),
            ),
        );
    }
}
