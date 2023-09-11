<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines;

use RuntimeException;
use Spatie\Cloneable\Cloneable;

use function array_map;
use function array_values;

readonly class PipelineItemCollection
{
    use Cloneable;

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

    public function first(): PipelineItem
    {
        $entity = $this->firstOrNull();

        if ($entity === null) {
            throw new RuntimeException('No PipelineItem found');
        }

        return $entity;
    }

    public function firstOrNull(): PipelineItem|null
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
            static fn (PipelineItem $e) => $e->asArray(),
        );
    }

    public function withPipeline(PipelineItem $pipeline): static
    {
        $entities = $this->entities;

        $entities[] = $pipeline;

        return $this->with(entities: $entities);
    }
}
