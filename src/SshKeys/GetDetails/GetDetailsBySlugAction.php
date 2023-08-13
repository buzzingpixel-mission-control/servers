<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys\GetDetails;

use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlIdp\Authorize\RequireAdminMiddleware;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlServers\SshKeys\Persistence\FindSshKeyParameters;
use MissionControlServers\SshKeys\SshKeyRepository;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function assert;
use function is_string;

readonly class GetDetailsBySlugAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->get('/ssh-keys/{slug}', self::class)
            ->add(RequireAdminMiddleware::class)
            ->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(
        private SshKeyRepository $repository,
        private GetDetailsResponderFactory $responderFactory,
    ) {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $slug = $request->getAttribute('slug');
        assert(is_string($slug));

        return $this->responderFactory->createResponder(
            $request,
            $response,
            $this->repository->findOneOrNull(
                FindSshKeyParameters::create()->withSlug(
                    $slug,
                ),
            ),
        )->respond();
    }
}
