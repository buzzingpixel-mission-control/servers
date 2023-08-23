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
}
