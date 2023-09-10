<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\AddEdit\ValueObjects;

use function array_map;
use function array_values;

class PipelineItems
{
    /** @var PipelineItem[] */
    public array $entities;

    /** @param PipelineItem[] $entities */
    public function __construct(array $entities = [])
    {
        $this->entities = array_values(array_map(
            static fn (PipelineItem $e) => $e,
            $entities,
        ));
    }

    /** @return mixed[] */
    public function map(callable $callback): array
    {
        return array_values(array_map(
            $callback,
            $this->entities,
        ));
    }

    /** @return array<array-key, string> */
    public function asArray(): array
    {
        /** @phpstan-ignore-next-line */
        return $this->map(
            static fn (PipelineItem $e) => $e->asArray(),
        );
    }
}
