<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs;

use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlServers\Pipelines\Persistence\FindPipelineParameters;
use MissionControlServers\Pipelines\PipelineRepository;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function assert;
use function is_string;

readonly class WebhookTriggerAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->any(
            '/pipelines/webhook/trigger/{secretId}',
            self::class,
        );
    }

    public function __construct(
        private PipelineRepository $repository,
        private WebhookTriggerResponderFactory $responderFactory,
    ) {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $secretId = $request->getAttribute('secretId');
        assert(is_string($secretId));

        return $this->responderFactory->runPipelineAndCreateResponder(
            $request,
            $response,
            $this->repository->findOneOrNull(
                FindPipelineParameters::create()->withSecretId(
                    $secretId,
                ),
            ),
        )->respond();
    }
}
