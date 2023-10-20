<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs;

use MissionControlServers\Pipelines\Pipeline;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

readonly class WebhookTriggerResponderFactory
{
    public function __construct(private JobApi $jobApi)
    {
    }

    public function runPipelineAndCreateResponder(
        ServerRequestInterface $request,
        ResponseInterface $response,
        Pipeline|null $pipeline,
    ): WebhookTriggerResponder {
        if ($pipeline === null) {
            return new WebhookTriggerRespondWithNotFound($request);
        }

        $this->jobApi->runPipelineIfNotRunning($pipeline);

        return new WebhookTriggerRespondWithSuccess($response);
    }
}
