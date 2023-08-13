<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\Persistence;

use RuntimeException;

use function array_map;
use function array_values;
use function count;

class ServerRecordCollection
{
    /** @var ServerRecord[] */
    public array $records;

    /** @param ServerRecord[] $records */
    public function __construct(array $records = [])
    {
        $this->records = array_values(array_map(
            static fn (ServerRecord $r) => $r,
            $records,
        ));
    }

    public function first(): ServerRecord
    {
        $record = $this->firstOrNull();

        if ($record === null) {
            throw new RuntimeException('No Server record found');
        }

        return $record;
    }

    public function firstOrNull(): ServerRecord|null
    {
        return $this->records[0] ?? null;
    }

    /** @return mixed[] */
    public function map(callable $callback): array
    {
        return array_values(array_map(
            $callback,
            $this->records,
        ));
    }

    public function count(): int
    {
        return count($this->records);
    }
}
