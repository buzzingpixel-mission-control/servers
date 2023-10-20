<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RecentRuns;

use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Persistence\Sort;
use MissionControlServers\Pipelines\Jobs\Persistence\FindPipelineJobParameters;
use MissionControlServers\Pipelines\Jobs\PipelineJobRepository;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function assert;
use function is_string;
use function json_encode;

use const JSON_PRETTY_PRINT;

readonly class GetRecentRunsListAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->any(
            '/pipelines/{id}/recent-runs',
            self::class,
        );
    }

    public function __construct(private PipelineJobRepository $repository)
    {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $id = $request->getAttribute('id');
        assert(is_string($id));

        $runs = $this->repository->findAll(
            FindPipelineJobParameters::create()
                ->withPipelineId($id)
                ->withOrderBy('added_at')
                ->withSort(Sort::DESC)
                ->withLimit(20),
        );

        $response = $response->withHeader(
            'Content-type',
            'application/json',
        );

        $response->getBody()->write((string) json_encode(
            $runs->asArray('items'),
            JSON_PRETTY_PRINT,
        ));

        return $response;
    }
}
