<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

readonly class Result
{
    /** @param string[] $message */
    public function __construct(
        public array $message = [],
        public bool $success = true,
    ) {
    }
}
