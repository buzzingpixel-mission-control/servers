<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\AddEdit;

use MissionControlBackend\ActionResultResponseFactory;
use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Http\JsonResponse\JsonResponder;
use MissionControlBackend\Http\JsonResponse\RespondWithArrayAndStatus;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlServers\Pipelines\AddEdit\ValueObjects\PipelineItem;
use MissionControlServers\Pipelines\Persistence\FindPipelineParameters;
use MissionControlServers\Pipelines\PipelineItem as PipelineItemEntity;
use MissionControlServers\Pipelines\PipelineRepository;
use MissionControlServers\Pipelines\ValueObjects\Description;
use MissionControlServers\Pipelines\ValueObjects\Id;
use MissionControlServers\Pipelines\ValueObjects\PipelineId;
use MissionControlServers\Pipelines\ValueObjects\RunAfterFail;
use MissionControlServers\Pipelines\ValueObjects\RunOnServers;
use MissionControlServers\Pipelines\ValueObjects\Script;
use MissionControlServers\Pipelines\ValueObjects\ServerId;
use MissionControlServers\Pipelines\ValueObjects\Type;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function array_map;
use function assert;
use function is_array;
use function is_string;

readonly class PatchEditPipelineAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->patch('/pipelines/{slug}', self::class)
            ->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(
        private JsonResponder $jsonResponder,
        private PipelineRepository $repository,
        private ActionResultResponseFactory $responseFactory,
    ) {
    }

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        $slug = $request->getAttribute('slug');
        assert(is_string($slug));

        $pipeline = $this->repository->findOne(
            FindPipelineParameters::create()->withSlug(
                $slug,
            ),
        );

        $rawPostData = $request->getParsedBody();

        $postData = PostedData::fromRawPostData(
            is_array($rawPostData) ? $rawPostData : [],
        );

        $postedProjectId = $postData->projectId->toNative();

        $projectId = $postedProjectId === '' ? null : $postedProjectId;

        // Clear out all items first
        $pipeline = $pipeline->withResetPipelineItems();

        $postData->pipelineItems->map(
            static function (PipelineItem $postedItem) use (
                &$pipeline,
            ): void {
                $pipeline = $pipeline->withPipelineItem(
                    new PipelineItemEntity(
                        Id::fromNative($postedItem->id->toNative()),
                        PipelineId::fromNative(
                            $pipeline->id->toNative(),
                        ),
                        Type::fromNative(
                            $postedItem->type->toNative(),
                        ),
                        Description::fromNative(
                            $postedItem->description->toNative(),
                        ),
                        Script::fromNative(
                            $postedItem->script->toNative(),
                        ),
                        new RunOnServers(
                            array_map(
                                static function (
                                    string $serverId,
                                ): ServerId {
                                    return ServerId::fromNative(
                                        $serverId,
                                    );
                                },
                                $postedItem->runOnServers->asArray(),
                            ),
                        ),
                        RunAfterFail::fromNative(
                            $postedItem->runAfterFail->toNative(),
                        ),
                    ),
                );
            },
        );

        $pipeline = $pipeline
            ->withTitleFromNative(
                $postData->title->toNative(),
            )
            ->withDescriptionFromNative(
                $postData->description->toNative(),
            )
            ->withProjectIdFromNative($projectId)
            ->withEnableWebhookFromNative(
                $postData->enableWebHook->toNative(),
            )
            ->withWebhookCheckForBranchFromNative(
                $postData->webhookCheckForBranch->toNative(),
            )
            ->withRunBeforeEveryItemFromNative(
                $postData->runBeforeEveryItem->toNative(),
            );

        $result = $this->repository->save($pipeline);

        if (! $result->success) {
            return $this->jsonResponder->respond(
                $this->responseFactory->createResponse(
                    $result,
                ),
            );
        }

        $freshRetrievedPipeline = $this->repository->findOne(
            FindPipelineParameters::create()->withId(
                $pipeline->id->toNative(),
            ),
        );

        return $this->jsonResponder->respond(
            new RespondWithArrayAndStatus(
                ['slug' => $freshRetrievedPipeline->slug->toNative()],
            ),
        );
    }
}
