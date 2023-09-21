<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Persistence;

use RuntimeException;

use function array_map;
use function array_values;
use function count;

readonly class PipelineJobRecordCollection
{
    /** @var PipelineJobRecord[] */
    public array $records;

    /** @param PipelineJobRecord[] $records */
    public function __construct(array $records = [])
    {
        $this->records = array_values(array_map(
            static fn (PipelineJobRecord $r) => $r,
            $records,
        ));
    }

    public function first(): PipelineJobRecord
    {
        $record = $this->firstOrNull();

        if ($record === null) {
            throw new RuntimeException('No PipelineJob record found');
        }

        return $record;
    }

    public function firstOrNull(): PipelineJobRecord|null
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
