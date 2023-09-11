<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines;

use MissionControlBackend\Url\ApiUrlGenerator;

use function array_merge;
use function implode;

// phpcs:disable SlevomatCodingStandard.TypeHints.ReturnTypeHint.MissingTraversableTypeHintSpecification

readonly class PipelineOutputFactory
{
    public function __construct(private ApiUrlGenerator $urlGenerator)
    {
    }

    /** @phpstan-ignore-next-line */
    public function createForAll(PipelineCollection $pipelines): array
    {
        return $pipelines->map(function (Pipeline $pipeline): array {
            return $this->create($pipeline);
        });
    }

    /** @phpstan-ignore-next-line */
    public function create(Pipeline $pipeline): array
    {
        return array_merge(
            $pipeline->asArray(),
            [
                'webhookTrigger' => $this->urlGenerator->generate(
                    implode('/', [
                        'pipelines',
                        'webhook',
                        'trigger',
                        $pipeline->secretId->toNative(),
                    ]),
                ),
            ],
        );
    }
}
