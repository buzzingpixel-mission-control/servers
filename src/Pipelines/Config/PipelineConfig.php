<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Config;

readonly class PipelineConfig
{
    public function __construct(public string $queueName)
    {
    }
}
