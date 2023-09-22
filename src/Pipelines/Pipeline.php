<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines;

use MissionControlServers\Pipelines\Persistence\PipelineItemRecord;
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

use function array_map;

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
            new PipelineItemCollection(
                array_map(
                    static function (
                        PipelineItemRecord $record,
                    ): PipelineItem {
                        return PipelineItem::fromRecord($record);
                    },
                    $record->pipelineItems()->records,
                ),
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
        public PipelineItemCollection $pipelineItems = new PipelineItemCollection(),
    ) {
    }

    /** @return array<string, scalar|array<array-key, array<string, scalar|null>>|null> */
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
            'pipelineItems' => $this->pipelineItems->asArray(),
        ];
    }

    public function withSlugFromString(string $slug): static
    {
        return $this->with(slug: Slug::fromNative($slug));
    }

    public function withResetPipelineItems(): static
    {
        return $this->with(pipelineItems: new PipelineItemCollection());
    }

    public function withPipelineItems(PipelineItemCollection $items): static
    {
        return $this->with(pipelineItems: $items);
    }

    public function withPipelineItem(PipelineItem $item): static
    {
        return $this->withPipelineItems(
            $this->pipelineItems->withPipelineItem($item),
        );
    }

    public function withTitleFromNative(string $value): static
    {
        return $this->with(title: Title::fromNative($value));
    }

    public function withDescriptionFromNative(string $value): static
    {
        return $this->with(description: Description::fromNative(
            $value,
        ));
    }

    public function withProjectIdFromNative(string|null $value): static
    {
        return $this->with(projectId: ProjectId::fromNative($value));
    }

    public function withEnableWebhookFromNative(bool $value): static
    {
        return $this->with(enableWebhook: EnableWebhook::fromNative(
            $value,
        ));
    }

    public function withWebhookCheckForBranchFromNative(string $value): static
    {
        return $this->with(
            webhookCheckForBranch: WebhookCheckForBranch::fromNative(
                $value,
            ),
        );
    }

    public function withRunBeforeEveryItemFromNative(string $value): static
    {
        return $this->with(runBeforeEveryItem: RunBeforeEveryItem::fromNative(
            $value,
        ));
    }
}
