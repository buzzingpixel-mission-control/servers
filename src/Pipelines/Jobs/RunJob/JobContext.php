<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use JetBrains\PhpStorm\ArrayShape;

readonly class JobContext
{
    /** @param string[] $context */
    public static function fromArray(
        /** @phpstan-ignore-next-line */
        #[ArrayShape([
            'pipelineJobId' => 'string',
            'pipelineJobItemId' => 'string',
        ])]
        array $context,
    ): self {
        return new self(
            $context['pipelineJobId'] ?? '',
            $context['pipelineJobItemId'] ?? '',
        );
    }

    public function __construct(
        public string $pipelineJobId,
        public string $pipelineJobItemId,
    ) {
    }
}
