<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\Persistence;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

use Assert\Assert;
use MissionControlBackend\ActionResult;
use MissionControlBackend\Persistence\MissionControlPdo;
use MissionControlBackend\Persistence\UuidFactoryWithOrderedTimeCodec;
use Throwable;

use function count;
use function implode;

readonly class CreateServer
{
    public function __construct(
        private MissionControlPdo $pdo,
        private FindServers $findServers,
        private UuidFactoryWithOrderedTimeCodec $uuidFactory,
    ) {
    }

    public function create(ServerRecord $record): ActionResult
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

    private function validateRecord(ServerRecord $record): ActionResult
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

        $existing = $this->findServers->findOneOrNull(
            FindServerParameters::create()->withSlug(
                $record->slug,
            ),
        );

        if ($existing !== null) {
            $errors[] = 'Slug must be unique';
        }

        return new ActionResult(
            count($errors) < 1,
            $errors,
        );
    }
}
