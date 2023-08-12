<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys\Persistence;

use Assert\Assert;
use MissionControlBackend\ActionResult;
use MissionControlBackend\Persistence\MissionControlPdo;
use Throwable;

use function count;
use function implode;

class SaveSshKey
{
    public function __construct(
        private MissionControlPdo $pdo,
        private FindSshKeys $findSshKeys,
    ) {
    }

    public function save(SshKeyRecord $record): ActionResult
    {
        $validationResult = $this->validateRecord($record);

        if (! $validationResult->success) {
            return $validationResult;
        }

        $statement = $this->pdo->prepare(implode(' ', [
            'UPDATE',
            $record->tableName(),
            'SET',
            $record->columnsAsUpdateSetPlaceholders(),
            'WHERE id = :id',
        ]));

        if (! $statement->execute($record->asParametersArray())) {
            return new ActionResult(
                false,
                $this->pdo->errorInfo(),
                $this->pdo->errorCode(),
            );
        }

        return new ActionResult();
    }

    private function validateRecord(SshKeyRecord $record): ActionResult
    {
        $errors = [];

        try {
            Assert::that($record->title)->notEmpty(
                'Title must be provided',
            );
        } catch (Throwable $exception) {
            $errors[] = $exception->getMessage();
        }

        try {
            Assert::that($record->slug)->notEmpty(
                'Slug must be provided',
            );
        } catch (Throwable $exception) {
            $errors[] = $exception->getMessage();
        }

        try {
            Assert::that($record->public)->notEmpty(
                'Public key must be provided',
            );
        } catch (Throwable $exception) {
            $errors[] = $exception->getMessage();
        }

        try {
            Assert::that($record->private)->notEmpty(
                'Private key must be provided',
            );
        } catch (Throwable $exception) {
            $errors[] = $exception->getMessage();
        }

        $existingSshKey = $this->findSshKeys->findOneOrNull(
            FindSshKeyParameters::create()
                ->withSlug($record->slug)
                ->withNotId($record->id),
        );

        if ($existingSshKey !== null) {
            $errors[] = 'Slug must be unique';
        }

        return new ActionResult(
            count($errors) < 1,
            $errors,
        );
    }
}
