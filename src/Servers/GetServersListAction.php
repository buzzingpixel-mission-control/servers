<?php

declare(strict_types=1);

namespace MissionControlServers\Servers;

use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Persistence\Sort;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlServers\Servers\Persistence\FindServerParameters;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function json_encode;

use const JSON_PRETTY_PRINT;

readonly class GetServersListAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->get('/servers', self::class)
            ->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(private ServerRepository $repository)
    {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $items = $this->repository->findAll(
            FindServerParameters::create()
                ->withIsActive(true)
                ->withOrderBy('title')
                ->withSort(Sort::ASC),
        );

        $response = $response->withHeader(
            'Content-type',
            'application/json',
        );

        $response->getBody()->write((string) json_encode(
            $items->asArray(),
            JSON_PRETTY_PRINT,
        ));

        return $response;
    }
}
