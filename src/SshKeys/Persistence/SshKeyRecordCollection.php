<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys\Persistence;

use RuntimeException;

use function array_map;
use function array_values;
use function count;

class SshKeyRecordCollection
{
    /** @var SshKeyRecord[] */
    public array $records;

    /** @param SshKeyRecord[] $records */
    public function __construct(array $records = [])
    {
        $this->records = array_values(array_map(
            static fn (SshKeyRecord $r) => $r,
            $records,
        ));
    }

    public function first(): SshKeyRecord
    {
        $record = $this->firstOrNull();

        if ($record === null) {
            throw new RuntimeException('No SSH key record found');
        }

        return $record;
    }

    public function firstOrNull(): SshKeyRecord|null
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
