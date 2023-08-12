<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys\Persistence;

use Assert\Assert;
use MissionControlBackend\ActionResult;
use MissionControlBackend\Persistence\MissionControlPdo;
use MissionControlBackend\Persistence\UuidFactoryWithOrderedTimeCodec;
use Throwable;

use function count;
use function implode;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class CreateSshKey
{
    public function __construct(
        private MissionControlPdo $pdo,
        private FindSshKeys $findSshKeys,
        private UuidFactoryWithOrderedTimeCodec $uuidFactory,
    ) {
    }

    public function create(SshKeyRecord $record): ActionResult
    {
        $validationResult = $this->validateRecord($record);

        if (! $validationResult->success) {
            return $validationResult;
        }

        $record->id = $this->uuidFactory->uuid4()->toString();

        $statement = $this->pdo->prepare(implode(' ', [
            'INSERT INTO',
            $record->tableName(),
            $record->columnsAsInsertIntoString(),
            'VALUES',
            $record->columnsAsValuePlaceholders(),
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
            FindSshKeyParameters::create()->withSlug(
                $record->slug,
            ),
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
