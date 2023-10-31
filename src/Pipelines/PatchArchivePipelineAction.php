<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines;

use MissionControlBackend\ActionResultResponseFactory;
use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Http\JsonResponse\JsonResponder;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlServers\Pipelines\Persistence\FindPipelineParameters;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function assert;
use function is_string;

readonly class PatchArchivePipelineAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->patch('/pipelines/archive/{id}', self::class)
            ->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(
        private JsonResponder $jsonResponder,
        private PipelineRepository $repository,
        private ActionResultResponseFactory $responseFactory,
    ) {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $id = $request->getAttribute('id');
        assert(is_string($id));

        $pipeline = $this->repository->findOne(
            FindPipelineParameters::create()->withId($id),
        );

        return $this->jsonResponder->respond(
            $this->responseFactory->createResponse(
                $this->repository->save(
                    $pipeline->withIsActive(false),
                ),
            ),
        );
    }
}
