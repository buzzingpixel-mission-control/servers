<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Persistence;

use function array_map;
use function array_values;
use function count;

class OrphanedItemIdCollection
{
    /** @var string[] */
    public array $ids;

    /** @param string[] $ids */
    public function __construct(array $ids)
    {
        $this->ids = array_values(array_map(
            static fn (string $id) => $id,
            $ids,
        ));
    }

    public function count(): int
    {
        return count($this->ids);
    }

    public function hasItems(): bool
    {
        return $this->count() > 0;
    }

    public function hasNoItems(): bool
    {
        return ! $this->hasItems();
    }
}
