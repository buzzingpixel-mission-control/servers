<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Persistence;

use MissionControlBackend\Persistence\MissionControlPdo;
use PDO;
use PDOException;

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

            return new PipelineRecordCollection(
                $results !== false ? $results : [],
            );
        } catch (PDOException) {
            // Annoyingly, an invalidly formatted UUID will cause a PDO
            // exception
            return new PipelineRecordCollection();
        }
    }
}
