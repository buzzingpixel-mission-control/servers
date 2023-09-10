<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Persistence;

use Assert\Assert;
use Cocur\Slugify\Slugify;
use MissionControlBackend\ActionResult;
use MissionControlBackend\Persistence\MissionControlPdo;
use MissionControlBackend\Persistence\UuidFactoryWithOrderedTimeCodec;
use Throwable;

use function count;
use function implode;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class CreatePipeline
{
    public function __construct(
        private Slugify $slugify,
        private FindPipelines $find,
        private MissionControlPdo $pdo,
        private UuidFactoryWithOrderedTimeCodec $uuidFactory,
    ) {
    }

    public function create(PipelineRecord $record): ActionResult
    {
        $record->slug = $this->slugify->slugify($record->title);

        $validationResult = $this->validateRecord($record);

        if (! $validationResult->success) {
            return $validationResult;
        }

        $record->id = $this->uuidFactory->uuid4()->toString();

        $record->secret_id = $this->uuidFactory->uuid4()->toString();

        $record->pipelineItems()->map(
            static function (PipelineItemRecord $itemRecord) use (
                $record,
            ): void {
                $itemRecord->pipeline_id = $record->id;
            },
        );

        $this->pdo->beginTransaction();

        $statement = $this->pdo->prepare(implode(' ', [
            'INSERT INTO',
            $record->tableName(),
            $record->columnsAsInsertIntoString(),
            'VALUES',
            $record->columnsAsValuePlaceholders(),
        ]));

        if (! $statement->execute($record->asParametersArray())) {
            $this->pdo->rollBack();

            return new ActionResult(
                false,
                $this->pdo->errorInfo(),
                $this->pdo->errorCode(),
            );
        }

        foreach ($record->pipelineItems()->records as $itemRecord) {
            $statement = $this->pdo->prepare(implode(
                ' ',
                [
                    'INSERT INTO',
                    $itemRecord->tableName(),
                    $itemRecord->columnsAsInsertIntoString(),
                    'VALUES',
                    $itemRecord->columnsAsValuePlaceholders(),
                ],
            ));

            if (
                ! $statement->execute($itemRecord->asParametersArray())
            ) {
                $this->pdo->rollBack();

                return new ActionResult(
                    false,
                    $this->pdo->errorInfo(),
                    $this->pdo->errorCode(),
                );
            }
        }

        $this->pdo->commit();

        return new ActionResult();
    }

    private function validateRecord(PipelineRecord $record): ActionResult
    {
        $errors = [];

        try {
            Assert::that($record->title)->notEmpty(
                'Title must be provided',
            );
        } catch (Throwable $exception) {
            $errors[] = $exception->getMessage();
        }

        $existing = $this->find->findOneOrNull(
            FindPipelineParameters::create()->withSlug(
                $record->slug,
            ),
        );

        if ($existing !== null) {
            $errors[] = 'Title must be unique';
        }

        return new ActionResult(
            count($errors) < 1,
            $errors,
        );
    }
}
