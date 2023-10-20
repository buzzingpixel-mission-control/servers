<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs;

use MissionControlServers\Pipelines\Pipeline;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

readonly class PostRunPipelineActionFactory
{
    public function __construct(private JobApi $jobApi)
    {
    }

    public function runActionAndSendResponder(
        ServerRequestInterface $request,
        ResponseInterface $response,
        Pipeline|null $pipeline,
    ): PostRunPipelineResponder {
        if ($pipeline === null) {
            return new PostRunPipelineResponderNotFound($request);
        }

        $result = $this->jobApi->runPipelineIfNotRunning($pipeline);

        if (! $result->success) {
            return new PostRunPipelineResponderAlreadyRunning(
                $response,
            );
        }

        return new PostRunPipelineResponderSuccess($response);
    }
}
