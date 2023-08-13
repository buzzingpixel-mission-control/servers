<?php

declare(strict_types=1);

namespace MissionControlServers\EventListeners;

use MissionControlBackend\Http\ApiApplyRoutesEvent;
use MissionControlServers\SshKeys\AddEdit\PatchEditSshKeyAction;
use MissionControlServers\SshKeys\AddEdit\PostAddSshKeyAction;
use MissionControlServers\SshKeys\GetSshKeysListAction;
use MissionControlServers\SshKeys\GetSshKeysListArchivedAction;

class Routing
{
    public function onApplyRoutes(ApiApplyRoutesEvent $event): void
    {
        GetSshKeysListAction::registerRoute($event);
        GetSshKeysListArchivedAction::registerRoute($event);
        PostAddSshKeyAction::registerRoute($event);
        PatchEditSshKeyAction::registerRoute($event);
    }
}
