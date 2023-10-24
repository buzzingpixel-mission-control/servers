<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Run;

use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlServers\Pipelines\Jobs\Persistence\FindPipelineJobParameters;
use MissionControlServers\Pipelines\Jobs\PipelineJobRepository;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function assert;
use function is_string;

readonly class GetRunAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->any(
            '/pipelines/{pipelineId}/run/{jobId}',
            self::class,
        );
    }

    public function __construct(
        private PipelineJobRepository $repository,
        private ResponderFactory $responderFactory,
    ) {
    }

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        $pipelineId = $request->getAttribute('pipelineId');
        assert(is_string($pipelineId));

        $jobId = $request->getAttribute('jobId');
        assert(is_string($jobId));

        $run = $this->repository->findOneOrNull(
            FindPipelineJobParameters::create()
                ->withPipelineId($pipelineId)
                ->withId($jobId),
        );

        return $this->responderFactory->create(
            $run,
            $request,
        )->respond();
    }
}
