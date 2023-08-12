<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys\Persistence;

use MissionControlBackend\Persistence\MissionControlPdo;
use PDO;
use PDOException;

readonly class FindSshKeys
{
    public function __construct(private MissionControlPdo $pdo)
    {
    }

    public function findOne(
        FindSshKeyParameters|null $parameters = null,
    ): SshKeyRecord {
        $parameters ??= new FindSshKeyParameters();

        $parameters = $parameters->with(limit: 1);

        return $this->findAll($parameters)->first();
    }

    public function findOneOrNull(
        FindSshKeyParameters|null $parameters = null,
    ): SshKeyRecord|null {
        $parameters ??= new FindSshKeyParameters();

        $parameters = $parameters->with(limit: 1);

        return $this->findAll($parameters)->firstOrNull();
    }

    public function findAll(
        FindSshKeyParameters|null $parameters = null,
    ): SshKeyRecordCollection {
        try {
            $parameters ??= new FindSshKeyParameters();

            $customQuery = $parameters->buildQuery();

            $statement = $this->pdo->prepare($customQuery->query);

            $statement->execute($customQuery->params);

            $results = $statement->fetchAll(
                PDO::FETCH_CLASS,
                SshKeyRecord::class,
            );

            return new SshKeyRecordCollection(
                $results !== false ? $results : [],
            );
        } catch (PDOException) {
            // Annoyingly, an invalidly formatted UUID will cause a PDO
            // exception
            return new SshKeyRecordCollection();
        }
    }
}
