<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Persistence;

use MissionControlBackend\Persistence\MissionControlPdo;
use PDO;
use PDOException;

use function array_fill;
use function array_map;
use function array_values;
use function count;
use function implode;

readonly class FindPipelineJobs
{
    public function __construct(private MissionControlPdo $pdo)
    {
    }

    public function findOne(
        FindPipelineJobParameters|null $parameters = null,
    ): PipelineJobRecord {
        $parameters ??= new FindPipelineJobParameters();

        $parameters = $parameters->with(limit: 1);

        return $this->findAll($parameters)->first();
    }

    public function findOneOrNull(
        FindPipelineJobParameters|null $parameters = null,
    ): PipelineJobRecord|null {
        $parameters ??= new FindPipelineJobParameters();

        $parameters = $parameters->with(limit: 1);

        return $this->findAll($parameters)->firstOrNull();
    }

    public function findAll(
        FindPipelineJobParameters|null $parameters = null,
    ): PipelineJobRecordCollection {
        try {
            $parameters ??= new FindPipelineJobParameters();

            $customQuery = $parameters->buildQuery();

            $statement = $this->pdo->prepare($customQuery->query);

            $statement->execute($customQuery->params);

            $results = $statement->fetchAll(
                PDO::FETCH_CLASS,
                PipelineJobRecord::class,
            );

            $ids = array_map(
                static fn (PipelineJobRecord $r) => $r->id,
                $results,
            );

            $itemRecords = $this->getItemRecords($ids);

            $records = new PipelineJobRecordCollection(
                $results !== false ? $results : [],
            );

            $records->map(
                static function (PipelineJobRecord $record) use (
                    $itemRecords,
                ): void {
                    $record->setPipelineJobItems(
                        $itemRecords->filterByPipelineJobId(
                            $record->id,
                        ),
                    );
                },
            );

            return $records;
        } catch (PDOException) {
            // Annoyingly, an invalidly formatted UUID will cause a PDO
            // exception
            return new PipelineJobRecordCollection();
        }
    }

    /** @param string[] $ids */
    private function getItemRecords(array $ids): PipelineJobItemRecordCollection
    {
        if (count($ids) < 1) {
            return new PipelineJobItemRecordCollection();
        }

        try {
            $ids = array_values($ids);

            $in = implode(
                ',',
                array_fill(
                    0,
                    count($ids),
                    '?',
                ),
            );

            $statement = $this->pdo->prepare(implode(
                ' ',
                [
                    'SELECT * FROM',
                    PipelineJobItemRecord::getTableName(),
                    'WHERE pipeline_job_id IN (' . $in . ')',
                ],
            ));

            $statement->execute($ids);

            $results = $statement->fetchAll(
                PDO::FETCH_CLASS,
                PipelineJobItemRecord::class,
            );

            return new PipelineJobItemRecordCollection(
                $results !== false ? $results : [],
            );
        } catch (PDOException) {
            return new PipelineJobItemRecordCollection();
        }
    }
}
