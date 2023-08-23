<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines;

use MissionControlServers\Pipelines\ValueObjects\Description;
use MissionControlServers\Pipelines\ValueObjects\EnableWebhook;
use MissionControlServers\Pipelines\ValueObjects\ProjectId;
use MissionControlServers\Pipelines\ValueObjects\RunBeforeEveryItem;
use MissionControlServers\Pipelines\ValueObjects\Slug;
use MissionControlServers\Pipelines\ValueObjects\Title;
use MissionControlServers\Pipelines\ValueObjects\WebhookCheckForBranch;
use Spatie\Cloneable\Cloneable;

readonly class NewPipeline
{
    use Cloneable;

    public function __construct(
        public Title $title,
        public Description $description = new Description(''),
        public ProjectId $projectId = new ProjectId(null),
        public EnableWebhook $enableWebhook = new EnableWebhook(true),
        public WebhookCheckForBranch $webhookCheckForBranch = new WebhookCheckForBranch(''),
        public RunBeforeEveryItem $runBeforeEveryItem = new RunBeforeEveryItem(''),
        public Slug $slug = new Slug(''),
    ) {
    }

    public function withSlugFromString(string $slug): static
    {
        return $this->with(slug: Slug::fromNative($slug));
    }
}
