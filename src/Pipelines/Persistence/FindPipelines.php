<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Persistence;

use MissionControlBackend\Persistence\MissionControlPdo;
use PDO;
use PDOException;

use function array_fill;
use function array_map;
use function array_values;
use function count;
use function implode;

readonly class FindPipelines
{
    public function __construct(private MissionControlPdo $pdo)
    {
    }

    public function findOne(
        FindPipelineParameters|null $parameters = null,
    ): PipelineRecord {
        $parameters ??= new FindPipelineParameters();

        $parameters = $parameters->with(limit: 1);

        return $this->findAll($parameters)->first();
    }

    public function findOneOrNull(
        FindPipelineParameters|null $parameters = null,
    ): PipelineRecord|null {
        $parameters ??= new FindPipelineParameters();

        $parameters = $parameters->with(limit: 1);

        return $this->findAll($parameters)->firstOrNull();
    }

    public function findAll(
        FindPipelineParameters|null $parameters = null,
    ): PipelineRecordCollection {
        try {
            $parameters ??= new FindPipelineParameters();

            $customQuery = $parameters->buildQuery();

            $statement = $this->pdo->prepare($customQuery->query);

            $statement->execute($customQuery->params);

            $results = $statement->fetchAll(
                PDO::FETCH_CLASS,
                PipelineRecord::class,
            );

            $ids = array_map(
                static fn (PipelineRecord $r) => $r->id,
                $results,
            );

            $itemRecords = $this->getItemRecords($ids);

            $records = new PipelineRecordCollection(
                $results !== false ? $results : [],
            );

            $records->map(
                static function (PipelineRecord $record) use (
                    $itemRecords,
                ): void {
                    $items = $itemRecords->filterByPipelineId(
                        $record->id,
                    );

                    $record->setPipelineItems(
                        $itemRecords->filterByPipelineId(
                            $record->id,
                        ),
                    );
                },
            );

            return $records;
        } catch (PDOException) {
            // Annoyingly, an invalidly formatted UUID will cause a PDO
            // exception
            return new PipelineRecordCollection();
        }
    }

    /** @param string[] $ids */
    private function getItemRecords(array $ids): PipelineItemRecordCollection
    {
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
                    PipelineItemRecord::getTableName(),
                    'WHERE pipeline_id IN (' . $in . ')',
                ],
            ));

            $statement->execute($ids);

            $results = $statement->fetchAll(
                PDO::FETCH_CLASS,
                PipelineItemRecord::class,
            );

            return new PipelineItemRecordCollection(
                $results !== false ? $results : [],
            );
        } catch (PDOException) {
            return new PipelineItemRecordCollection();
        }
    }
}
