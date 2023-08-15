<?php

declare(strict_types=1);

namespace MissionControlServers\Servers;

use MissionControlBackend\ActionResult;
use MissionControlBackend\ActionResultResponseFactory;
use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Http\JsonResponse\JsonResponder;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlServers\Servers\Persistence\FindServerParameters;
use MissionControlServers\Servers\ValueObjects\IsActive;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function array_merge;
use function json_decode;

readonly class PatchServersUnArchiveAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->patch('/servers/un-archive', self::class)
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
        /** @var string[] $serverIds */
        $serverIds = array_merge(
            // Make sure if the incoming array is empty we don't get all
            ['949bb71d-e1a3-4f42-bc99-2ed3922233a9'],
            /** @phpstan-ignore-next-line */
            json_decode(
                (string) $request->getBody(),
                true,
            )['serverIds'] ?? [],
        );

        $servers = $this->repository->findAll(
            FindServerParameters::create()
                ->withIds($serverIds),
        );

        /** @var ActionResult[] $results */
        $results = $servers->map(function (Server $server) {
            return $this->repository->save(
                $server->with(isActive: IsActive::fromNative(
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
