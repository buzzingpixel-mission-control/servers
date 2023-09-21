<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Persistence;

use RuntimeException;

use function array_map;
use function array_values;
use function count;

readonly class PipelineJobItemRecordCollection
{
    /** @var PipelineJobItemRecord[] */
    public array $records;

    /** @param PipelineJobItemRecord[] $records */
    public function __construct(array $records = [])
    {
        $this->records = array_values(array_map(
            static fn (PipelineJobItemRecord $r) => $r,
            $records,
        ));
    }

    public function first(): PipelineJobItemRecord
    {
        $record = $this->firstOrNull();

        if ($record === null) {
            throw new RuntimeException(
                'No PipelineJobItem record found',
            );
        }

        return $record;
    }

    public function firstOrNull(): PipelineJobItemRecord|null
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
