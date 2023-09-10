<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\AddEdit;

use MissionControlBackend\ActionResultResponseFactory;
use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Http\JsonResponse\JsonResponder;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlServers\Pipelines\AddEdit\ValueObjects\PipelineItem;
use MissionControlServers\Pipelines\NewPipeline;
use MissionControlServers\Pipelines\NewPipelineItem;
use MissionControlServers\Pipelines\NewPipelineItemCollection;
use MissionControlServers\Pipelines\PipelineRepository;
use MissionControlServers\Pipelines\ValueObjects\Description;
use MissionControlServers\Pipelines\ValueObjects\EnableWebhook;
use MissionControlServers\Pipelines\ValueObjects\PipelineId;
use MissionControlServers\Pipelines\ValueObjects\ProjectId;
use MissionControlServers\Pipelines\ValueObjects\RunAfterFail;
use MissionControlServers\Pipelines\ValueObjects\RunBeforeEveryItem;
use MissionControlServers\Pipelines\ValueObjects\RunOnServers;
use MissionControlServers\Pipelines\ValueObjects\Script;
use MissionControlServers\Pipelines\ValueObjects\ServerId;
use MissionControlServers\Pipelines\ValueObjects\Title;
use MissionControlServers\Pipelines\ValueObjects\Type;
use MissionControlServers\Pipelines\ValueObjects\WebhookCheckForBranch;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function array_map;
use function is_array;

readonly class PostAddPipelineAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->post('/pipelines', self::class)
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
        $rawPostData = $request->getParsedBody();

        $postData = PostedData::fromRawPostData(
            is_array($rawPostData) ? $rawPostData : [],
        );

        $postedProjectId = $postData->projectId->toNative();

        $projectId = $postedProjectId === '' ? null : $postedProjectId;

        return $this->jsonResponder->respond(
            $this->responseFactory->createResponse(
                $this->repository->create(
                    new NewPipeline(
                        Title::fromNative(
                            $postData->title->toNative(),
                        ),
                        Description::fromNative(
                            $postData->description->toNative(),
                        ),
                        ProjectId::fromNative($projectId),
                        EnableWebhook::fromNative(
                            $postData->enableWebHook->toNative(),
                        ),
                        WebhookCheckForBranch::fromNative(
                            $postData->webhookCheckForBranch->toNative(),
                        ),
                        RunBeforeEveryItem::fromNative(
                            $postData->runBeforeEveryItem->toNative(),
                        ),
                        new NewPipelineItemCollection(
                            /** @phpstan-ignore-next-line */
                            $postData->pipelineItems->map(
                                static function (
                                    PipelineItem $item,
                                ): NewPipelineItem {
                                    return new NewPipelineItem(
                                        PipelineId::fromNative(
                                            $item->id->toNative(),
                                        ),
                                        Type::fromNative(
                                            $item->type->toNative(),
                                        ),
                                        Description::fromNative(
                                            $item->description->toNative(),
                                        ),
                                        Script::fromNative(
                                            $item->script->toNative(),
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
                                                $item->runOnServers->asArray(),
                                            ),
                                        ),
                                        RunAfterFail::fromNative(
                                            $item->runAfterFail->toNative(),
                                        ),
                                    );
                                },
                            ),
                        ),
                    ),
                ),
            ),
        );
    }
}
