<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines;

use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Persistence\Sort;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlServers\Pipelines\Persistence\FindPipelineParameters;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function json_encode;

use const JSON_PRETTY_PRINT;

readonly class GetPipelinesListAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->get('/pipelines', self::class)
            ->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(
        private PipelineRepository $repository,
        private PipelineOutputFactory $outputFactory,
    ) {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $items = $this->repository->findAll(
            FindPipelineParameters::create()
                ->withIsActive(true)
                ->withOrderBy('title')
                ->withSort(Sort::ASC),
        );

        $response = $response->withHeader(
            'Content-type',
            'application/json',
        );

        $response->getBody()->write((string) json_encode(
            $this->outputFactory->createForAll($items),
            JSON_PRETTY_PRINT,
        ));

        return $response;
    }
}
