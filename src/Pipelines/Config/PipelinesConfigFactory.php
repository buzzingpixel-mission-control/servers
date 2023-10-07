<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Config;

use Psr\EventDispatcher\EventDispatcherInterface;
use RuntimeException;

use function implode;

readonly class PipelinesConfigFactory
{
    public function __construct(
        private EventDispatcherInterface $eventDispatcher,
    ) {
    }

    public function create(): PipelineConfig
    {
        $event = new ApplyPipelinesConfigEvent();

        $this->eventDispatcher->dispatch($event);

        if ($event->config === null) {
            throw new RuntimeException(
                implode(' ', [
                    'You must listen for the event',
                    ApplyPipelinesConfigEvent::class,
                    'and set up a PipelinesConfig',
                ]),
            );
        }

        return $event->config;
    }
}
