<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs;

use BuzzingPixel\Queue\QueueHandler;
use BuzzingPixel\Queue\QueueItem;
use BuzzingPixel\Queue\QueueItemJob;
use BuzzingPixel\Queue\QueueItemJobCollection;
use MissionControlBackend\ActionResult;
use MissionControlServers\Pipelines\Config\PipelineConfig;
use MissionControlServers\Pipelines\Jobs\Persistence\CreatePipelineJob;
use MissionControlServers\Pipelines\Jobs\Persistence\FindPipelineJobParameters;
use MissionControlServers\Pipelines\Jobs\RunJob\PipelineJobItemQueueJob;
use MissionControlServers\Pipelines\Pipeline;

readonly class JobApi
{
    public function __construct(
        private PipelineConfig $config,
        private QueueHandler $queueHandler,
        private PipelineJobRepository $repository,
        private CreatePipelineJob $createPipelineJob,
    ) {
    }

    public function runPipelineIfNotRunning(Pipeline $pipeline): ActionResult
    {
        $unRunJob = $this->repository->findOneOrNull(
            FindPipelineJobParameters::create()
                ->withPipelineId(
                    $pipeline->id->toNative(),
                )
                ->withIsFinished(false),
        );

        if ($unRunJob !== null) {
            return new ActionResult(false);
        }

        $result = $this->createPipelineJob->create(
            $pipeline->id->toNative(),
        );

        if (! $result->success) {
            return $result;
        }

        $job = $result->job();

        $this->queueHandler->enqueue(
            new QueueItem(
                'pipeline_job_' . $job->id->toNative(),
                'Pipeline Job: ' . $pipeline->title->toNative(),
                new QueueItemJobCollection(
                    /** @phpstan-ignore-next-line */
                    $job->pipelineJobItems->map(
                        static function (
                            PipelineJobItem $item,
                        ) use ($job): QueueItemJob {
                            return new QueueItemJob(
                                PipelineJobItemQueueJob::class,
                                context: [
                                    'pipelineJobId' => $job->id->toNative(),
                                    'pipelineJobItemId' => $item->id->toNative(),
                                ],
                            );
                        },
                    ),
                ),
            ),
            $this->config->queueName,
        );

        return $result;
    }
}
