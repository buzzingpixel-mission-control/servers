<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys;

use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Persistence\Sort;
use MissionControlIdp\Authorize\RequireAdminMiddleware;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlServers\SshKeys\Persistence\FindSshKeyParameters;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function json_encode;

use const JSON_PRETTY_PRINT;

readonly class GetSshKeysListAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->get('/ssh-keys/list', self::class)
            ->add(RequireAdminMiddleware::class)
            ->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(private SshKeyRepository $repository)
    {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $items = $this->repository->findAll(
            FindSshKeyParameters::create()
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
