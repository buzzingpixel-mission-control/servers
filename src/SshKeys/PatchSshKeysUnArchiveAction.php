<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys;

use MissionControlBackend\ActionResult;
use MissionControlBackend\ActionResultResponseFactory;
use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Http\JsonResponse\JsonResponder;
use MissionControlIdp\Authorize\RequireAdminMiddleware;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlServers\SshKeys\Persistence\FindSshKeyParameters;
use MissionControlServers\SshKeys\ValueObjects\IsActive;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function array_merge;
use function json_decode;

readonly class PatchSshKeysUnArchiveAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->patch('/ssh-keys/un-archive', self::class)
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
        /** @var string[] $sshKeyIds */
        $sshKeyIds = array_merge(
            // Make sure if the incoming array is empty we don't get all
            ['949bb71d-e1a3-4f42-bc99-2ed3922233a9'],
            /** @phpstan-ignore-next-line */
            json_decode(
                (string) $request->getBody(),
                true,
            )['sshKeyIds'] ?? [],
        );

        $sshKeys = $this->repository->findAll(
            FindSshKeyParameters::create()
                ->withIds($sshKeyIds),
        );

        /** @var ActionResult[] $results */
        $results = $sshKeys->map(function (SshKey $sshKey) {
            return $this->repository->saveSshKey(
                $sshKey->with(isActive: IsActive::fromNative(
                    true,
                )),
            );
        });

        $result = new ActionResult();

        foreach ($results as $intermediateResult) {
            if ($intermediateResult->success) {
                continue;
            }

            $result = new ActionResult(
                false,
                array_merge(
                    $result->message,
                    $intermediateResult->message,
                ),
            );
        }

        return $this->jsonResponder->respond(
            $this->responseFactory->createResponse(
                $result,
            ),
        );
    }
}
