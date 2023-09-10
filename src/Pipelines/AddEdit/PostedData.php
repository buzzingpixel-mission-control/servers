<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\AddEdit;

use MissionControlServers\Pipelines\AddEdit\ValueObjects\Description;
use MissionControlServers\Pipelines\AddEdit\ValueObjects\EnableWebHook;
use MissionControlServers\Pipelines\AddEdit\ValueObjects\PipelineItem;
use MissionControlServers\Pipelines\AddEdit\ValueObjects\PipelineItems;
use MissionControlServers\Pipelines\AddEdit\ValueObjects\ProjectId;
use MissionControlServers\Pipelines\AddEdit\ValueObjects\RunBeforeEveryItem;
use MissionControlServers\Pipelines\AddEdit\ValueObjects\Title;
use MissionControlServers\Pipelines\AddEdit\ValueObjects\WebhookCheckForBranch;

use function array_map;
use function is_array;

readonly class PostedData
{
    /** @param array<array-key, scalar|null> $data */
    public static function fromRawPostData(array $data): self
    {
        $rawItems = $data['pipeline_items'] ?? [];
        $rawItems = is_array($rawItems) ? $rawItems : [];

        return new self(
            Title::fromNative((string) ($data['title'] ?? '')),
            Description::fromNative(
                (string) ($data['description'] ?? ''),
            ),
            ProjectId::fromNative(
                (string) ($data['project_id'] ?? ''),
            ),
            EnableWebHook::fromNative(
                (bool) ($data['enable_webhook'] ?? false),
            ),
            WebhookCheckForBranch::fromNative(
                (string) ($data['webhook_check_for_branch'] ?? ''),
            ),
            RunBeforeEveryItem::fromNative(
                (string) ($data['run_before_every_item'] ?? ''),
            ),
            new PipelineItems(array_map(
                static function (array $item): PipelineItem {
                    return PipelineItem::fromRawPostData($item);
                },
                $rawItems,
            )),
        );
    }

    public function __construct(
        public Title $title,
        public Description $description,
        public ProjectId $projectId,
        public EnableWebHook $enableWebHook,
        public WebhookCheckForBranch $webhookCheckForBranch,
        public RunBeforeEveryItem $runBeforeEveryItem,
        public PipelineItems $pipelineItems,
    ) {
    }
}
