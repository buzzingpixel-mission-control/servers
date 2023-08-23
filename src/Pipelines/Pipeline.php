<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines;

use MissionControlServers\Pipelines\Persistence\PipelineRecord;
use MissionControlServers\Pipelines\ValueObjects\Description;
use MissionControlServers\Pipelines\ValueObjects\EnableWebhook;
use MissionControlServers\Pipelines\ValueObjects\Id;
use MissionControlServers\Pipelines\ValueObjects\IsActive;
use MissionControlServers\Pipelines\ValueObjects\ProjectId;
use MissionControlServers\Pipelines\ValueObjects\RunBeforeEveryItem;
use MissionControlServers\Pipelines\ValueObjects\SecretId;
use MissionControlServers\Pipelines\ValueObjects\Slug;
use MissionControlServers\Pipelines\ValueObjects\Title;
use MissionControlServers\Pipelines\ValueObjects\WebhookCheckForBranch;
use Spatie\Cloneable\Cloneable;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class Pipeline
{
    use Cloneable;

    public static function fromRecord(PipelineRecord $record): self
    {
        return new self(
            Id::fromNative($record->id),
            ProjectId::fromNative($record->project_id),
            SecretId::fromNative($record->secret_id),
            IsActive::fromNative($record->is_active),
            EnableWebhook::fromNative(
                $record->enable_webhook,
            ),
            WebhookCheckForBranch::fromNative(
                $record->webhook_check_for_branch,
            ),
            Title::fromNative($record->title),
            Slug::fromNative($record->slug),
            Description::fromNative($record->description),
            RunBeforeEveryItem::fromNative(
                $record->run_before_every_item,
            ),
        );
    }

    public function __construct(
        public Id $id,
        public ProjectId $projectId,
        public SecretId $secretId,
        public IsActive $isActive,
        public EnableWebhook $enableWebhook,
        public WebhookCheckForBranch $webhookCheckForBranch,
        public Title $title,
        public Slug $slug,
        public Description $description,
        public RunBeforeEveryItem $runBeforeEveryItem,
    ) {
    }

    /** @return array<string, scalar|null> */
    public function asArray(): array
    {
        return [
            'id' => $this->id->toNative(),
            'projectId' => $this->projectId->toNative(),
            'secretId' => $this->secretId->toNative(),
            'isActive' => $this->isActive->toNative(),
            'enableWebhook' => $this->enableWebhook->toNative(),
            'webhookCheckForBranch' => $this->webhookCheckForBranch->toNative(),
            'title' => $this->title->toNative(),
            'slug' => $this->slug->toNative(),
            'description' => $this->description->toNative(),
            'runBeforeEveryItem' => $this->runBeforeEveryItem->toNative(),
        ];
    }

    public function withSlugFromString(string $slug): static
    {
        return $this->with(slug: Slug::fromNative($slug));
    }
}
