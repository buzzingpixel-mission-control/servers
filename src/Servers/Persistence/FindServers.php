<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\Persistence;

use MissionControlBackend\Persistence\MissionControlPdo;
use PDO;
use PDOException;

readonly class FindServers
{
    public function __construct(private MissionControlPdo $pdo)
    {
    }

    public function findOne(
        FindServerParameters|null $parameters = null,
    ): ServerRecord {
        $parameters ??= new FindServerParameters();

        $parameters = $parameters->with(limit: 1);

        return $this->findAll($parameters)->first();
    }

    public function findOneOrNull(
        FindServerParameters|null $parameters = null,
    ): ServerRecord|null {
        $parameters ??= new FindServerParameters();

        $parameters = $parameters->with(limit: 1);

        return $this->findAll($parameters)->firstOrNull();
    }

    public function findAll(
        FindServerParameters|null $parameters = null,
    ): ServerRecordCollection {
        try {
            $parameters ??= new FindServerParameters();

            $customQuery = $parameters->buildQuery();

            $statement = $this->pdo->prepare($customQuery->query);

            $statement->execute($customQuery->params);

            $results = $statement->fetchAll(
                PDO::FETCH_CLASS,
                ServerRecord::class,
            );

            return new ServerRecordCollection(
                $results !== false ? $results : [],
            );
        } catch (PDOException) {
            // Annoyingly, an invalidly formatted UUID will cause a PDO
            // exception
            return new ServerRecordCollection();
        }
    }
}
