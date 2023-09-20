<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Persistence;

use MissionControlBackend\Persistence\Record;
use MissionControlServers\Pipelines\NewPipeline;
use MissionControlServers\Pipelines\Pipeline;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

class PipelineRecord extends Record
{
    public static function getTableName(): string
    {
        return PipelinesTable::TABLE_NAME;
    }

    public function tableName(): string
    {
        return PipelinesTable::TABLE_NAME;
    }

    public static function fromNewEntity(NewPipeline $entity): self
    {
        $record = new self();

        $record->title = $entity->title->toNative();

        $record->description = $entity->description->toNative();

        $record->project_id = $entity->projectId->toNative();

        $record->enable_webhook = $entity->enableWebhook->toNative();

        $record->webhook_check_for_branch = $entity->webhookCheckForBranch->toNative();

        $record->run_before_every_item = $entity->runBeforeEveryItem->toNative();

        $pipelineItemRecords = [];

        foreach ($entity->pipelineItems->entities as $index => $item) {
            $itemRecord = new PipelineItemRecord();

            $itemRecord->item_order = $index;

            $itemRecord->type = $item->type->toNative();

            $itemRecord->description = $item->description->toNative();

            $itemRecord->script = $item->script->toNative();

            $itemRecord->run_on_servers = $item->runOnServers->asJson();

            $itemRecord->run_after_fail = $item->runAfterFail->toNative();

            $pipelineItemRecords[] = $itemRecord;
        }

        $record->setPipelineItems(new PipelineItemRecordCollection(
            $pipelineItemRecords,
        ));

        return $record;
    }

    public static function fromEntity(Pipeline $entity): self
    {
        $record = new self();

        $record->id = $entity->id->toNative();

        $record->project_id = $entity->projectId->toNative();

        $record->secret_id = $entity->secretId->toNative();

        $record->is_active = $entity->isActive->toNative();

        $record->enable_webhook = $entity->enableWebhook->toNative();

        $record->webhook_check_for_branch = $entity->webhookCheckForBranch->toNative();

        $record->title = $entity->title->toNative();

        $record->slug = $entity->slug->toNative();

        $record->description = $entity->description->toNative();

        $record->run_before_every_item = $entity->runBeforeEveryItem->toNative();

        $pipelineItemRecords = [];

        foreach ($entity->pipelineItems->entities as $index => $item) {
            $itemRecord = new PipelineItemRecord();

            $itemRecord->id = $item->id->toNative();

            $itemRecord->pipeline_id = $item->pipelineId->toNative();

            $itemRecord->item_order = $index;

            $itemRecord->type = $item->type->toNative();

            $itemRecord->description = $item->description->toNative();

            $itemRecord->script = $item->script->toNative();

            $itemRecord->run_on_servers = $item->runOnServers->asJson();

            $itemRecord->run_after_fail = $item->runAfterFail->toNative();

            $pipelineItemRecords[] = $itemRecord;
        }

        $record->setPipelineItems(new PipelineItemRecordCollection(
            $pipelineItemRecords,
        ));

        return $record;
    }

    /** Primary key */
    public string $id = '';

    public string|null $project_id = null;

    public string $secret_id = '';

    public bool $is_active = true;

    public bool $enable_webhook = true;

    public string $webhook_check_for_branch = '';

    public string $title = '';

    public string $slug = '';

    public string $description = '';

    public string $run_before_every_item = '';

    private PipelineItemRecordCollection $pipelineItems;

    public function __construct()
    {
        $this->pipelineItems = new PipelineItemRecordCollection();
    }

    public function pipelineItems(): PipelineItemRecordCollection
    {
        return $this->pipelineItems;
    }

    public function setPipelineItems(PipelineItemRecordCollection $items): self
    {
        $this->pipelineItems = $items;

        return $this;
    }

    public function addPipelineItem(PipelineItemRecord $item): self
    {
        $this->pipelineItems->records[] = $item;

        return $this;
    }
}
