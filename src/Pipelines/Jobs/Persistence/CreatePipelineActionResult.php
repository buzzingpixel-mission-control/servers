<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Persistence;

use MissionControlBackend\ActionResult;
use MissionControlServers\Pipelines\Jobs\PipelineJob;

readonly class CreatePipelineActionResult extends ActionResult
{
    public static function fromActionResult(ActionResult $result): self
    {
        return new self(
            $result->success,
            $result->message,
            $result->errorCode,
        );
    }

    /** @param string[] $message */
    public function __construct(
        bool $success = true,
        array $message = [],
        int|string $errorCode = '',
        public PipelineJob|null $job = null,
    ) {
        parent::__construct(
            $success,
            $message,
            $errorCode,
        );
    }

    public function job(): PipelineJob
    {
        /** @phpstan-ignore-next-line */
        return $this->job;
    }
}
