<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs;

use RuntimeException;
use Spatie\Cloneable\Cloneable;

use function array_map;
use function array_values;

class PipelineJobItemCollection
{
    use Cloneable;

    /** @var PipelineJobItem[] */
    public array $entities;

    /** @param PipelineJobItem[] $entities */
    public function __construct(array $entities = [])
    {
        $this->entities = array_values(array_map(
            static fn (PipelineJobItem $e) => $e,
            $entities,
        ));
    }

    public function first(): PipelineJobItem
    {
        $entity = $this->firstOrNull();

        if ($entity === null) {
            throw new RuntimeException('No PipelineJobItem found');
        }

        return $entity;
    }

    public function firstOrNull(): PipelineJobItem|null
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
    public function asArray(): array
    {
        /** @phpstan-ignore-next-line */
        return $this->map(
            static fn (PipelineJobItem $e) => $e->asArray(),
        );
    }

    public function withPipelineJobItem(PipelineJobItem $pipeline): static
    {
        $entities = $this->entities;

        $entities[] = $pipeline;

        return $this->with(entities: $entities);
    }
}
