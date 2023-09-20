<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Persistence;

use Assert\Assert;
use Cocur\Slugify\Slugify;
use MissionControlBackend\ActionResult;
use MissionControlBackend\Persistence\MissionControlPdo;
use Throwable;

use function count;

readonly class SavePipeline
{
    public function __construct(
        private Slugify $slugify,
        private FindPipelines $find,
        private MissionControlPdo $pdo,
        private AddNewPipelineItems $addNewPipelineItems,
        private DeleteOrphanedItems $deleteOrphanedItems,
        private SavePipelineUpdateMainRecord $updateMainRecord,
        private SavePipelineDetermineItemResults $determineItemIds,
        private UpdateExistingPipelineItems $updateExistingPipelineItems,
    ) {
    }

    public function save(PipelineRecord $record): ActionResult
    {
        $record->slug = $this->slugify->slugify($record->title);

        $validationResult = $this->validateRecord($record);

        if (! $validationResult->success) {
            return $validationResult;
        }

        $itemResults = $this->determineItemIds->determine($record);

        $this->pdo->beginTransaction();

        $result = $this->updateMainRecord->update(
            $this->pdo,
            $record,
        );

        if (! $result->success) {
            $this->pdo->rollBack();

            return $result;
        }

        $result = $this->deleteOrphanedItems->delete(
            $this->pdo,
            $itemResults->orphanedItemIds,
        );

        if (! $result->success) {
            $this->pdo->rollBack();

            return $result;
        }

        $result = $this->addNewPipelineItems->add(
            $this->pdo,
            $itemResults->newItems,
        );

        if (! $result->success) {
            $this->pdo->rollBack();

            return $result;
        }

        $result = $this->updateExistingPipelineItems->update(
            $this->pdo,
            $itemResults->existingItems,
        );

        if (! $result->success) {
            $this->pdo->rollBack();

            return $result;
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

        try {
            Assert::that($record->slug)->notEmpty(
                'Slug must be provided',
            );
        } catch (Throwable $exception) {
            $errors[] = $exception->getMessage();
        }

        $existing = $this->find->findOneOrNull(
            FindPipelineParameters::create()
                ->withSlug($record->slug)
                ->withNotId($record->id),
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
