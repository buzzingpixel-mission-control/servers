<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys\AddEdit;

use MissionControlBackend\ActionResultResponseFactory;
use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Http\JsonResponse\JsonResponder;
use MissionControlIdp\Authorize\RequireAdminMiddleware;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlServers\SshKeys\Persistence\FindSshKeyParameters;
use MissionControlServers\SshKeys\SshKeyRepository;
use MissionControlServers\SshKeys\ValueObjects\Title;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function assert;
use function is_array;
use function is_string;

readonly class PatchEditSshKeyAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->patch('/ssh-keys/edit/{id}', self::class)
            ->add(RequireAdminMiddleware::class)
            ->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(
        private SshKeyRepository $repository,
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

        $sshKey = $this->repository->findOne(
            FindSshKeyParameters::create()->withId($id),
        );

        $rawPostData = $request->getParsedBody();

        $postData = PostedData::fromRawPostData(
            is_array($rawPostData) ? $rawPostData : [],
        );

        return $this->jsonResponder->respond(
            $this->responseFactory->createResponse(
                $this->repository->saveSshKey(
                    $sshKey->with(title: Title::fromNative(
                        $postData->title->toNative(),
                    )),
                ),
            ),
        );
    }
}
