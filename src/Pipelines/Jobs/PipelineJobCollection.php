<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs;

use RuntimeException;

use function array_map;
use function array_values;

class PipelineJobCollection
{
    /** @var PipelineJob[] */
    public array $entities;

    /** @param PipelineJob[] $entities */
    public function __construct(array $entities = [])
    {
        $this->entities = array_values(array_map(
            static fn (PipelineJob $e) => $e,
            $entities,
        ));
    }

    public function first(): PipelineJob
    {
        $entity = $this->firstOrNull();

        if ($entity === null) {
            throw new RuntimeException('No PipelineJob found');
        }

        return $entity;
    }

    public function firstOrNull(): PipelineJob|null
    {
        return $this->entities[0] ?? null;
    }

    /** @return mixed[] */
    public function map(callable $callback): array
    {
        return array_values(array_map(
            $callback,
            $this->entities,
        ));
    }

    /** @return array<array-key, array<string, scalar|null>> */
    public function asArray(string $itemsKey = 'pipelineJobItems'): array
    {
        /** @phpstan-ignore-next-line */
        return $this->map(
            static fn (PipelineJob $e) => $e->asArray(
                $itemsKey,
            ),
        );
    }
}
