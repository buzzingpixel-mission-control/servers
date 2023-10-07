<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Config;

class ApplyPipelinesConfigEvent
{
    public function __construct(public PipelineConfig|null $config = null)
    {
    }

    public function addConfig(PipelineConfig $config): self
    {
        $this->config = $config;

        return $this;
    }
}
