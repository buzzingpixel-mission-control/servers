<?php

declare(strict_types=1);

namespace MissionControlServers\Dependencies;

use MissionControlBackend\ContainerBindings;
use MissionControlServers\Pipelines\Config\PipelineConfig;
use MissionControlServers\Pipelines\Config\PipelinesConfigFactory;
use Psr\Container\ContainerInterface;

use function assert;

class RegisterBindings
{
    public static function register(ContainerBindings $containerBindings): void
    {
        $containerBindings->addBinding(
            PipelineConfig::class,
            static function (ContainerInterface $di): PipelineConfig {
                $factory = $di->get(PipelinesConfigFactory::class);

                assert($factory instanceof PipelinesConfigFactory);

                return $factory->create();
            },
        );
    }
}
