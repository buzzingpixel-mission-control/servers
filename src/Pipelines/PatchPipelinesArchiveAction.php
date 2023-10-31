<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines;

use MissionControlBackend\ActionResult;
use MissionControlBackend\ActionResultResponseFactory;
use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Http\JsonResponse\JsonResponder;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlServers\Pipelines\Persistence\FindPipelineParameters;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function array_merge;
use function json_decode;

readonly class PatchPipelinesArchiveAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->patch('/pipelines/archive', self::class)
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
        /** @var string[] $pipelineIds */
        $pipelineIds = array_merge(
            // Make sure if the incoming array is empty we don't get all
            ['949bb71d-e1a3-4f42-bc99-2ed3922233a9'],
            /** @phpstan-ignore-next-line */
            json_decode(
                (string) $request->getBody(),
                true,
            )['pipelineIds'] ?? [],
        );

        $pipelines = $this->repository->findAll(
            FindPipelineParameters::create()->withIds(
                $pipelineIds,
            ),
        );

        /** @var ActionResult[] $results */
        $results = $pipelines->map(function (Pipeline $pipeline) {
            return $this->repository->save($pipeline->withIsActive(
                false,
            ));
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
