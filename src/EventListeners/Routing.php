<?php

declare(strict_types=1);

namespace MissionControlServers\EventListeners;

use MissionControlBackend\Http\ApiApplyRoutesEvent;
use MissionControlServers\Servers\AddEdit\PostAddServerAction;
use MissionControlServers\Servers\GetServersListAction;
use MissionControlServers\Servers\GetServersListArchivedAction;
use MissionControlServers\SshKeys\AddEdit\PatchArchiveSshKeyAction;
use MissionControlServers\SshKeys\AddEdit\PatchEditSshKeyAction;
use MissionControlServers\SshKeys\AddEdit\PatchUnArchiveSshKeyAction;
use MissionControlServers\SshKeys\AddEdit\PostAddSshKeyAction;
use MissionControlServers\SshKeys\GetDetails\GetDetailsBySlugAction;
use MissionControlServers\SshKeys\GetSshKeysListAction;
use MissionControlServers\SshKeys\GetSshKeysListArchivedAction;
use MissionControlServers\SshKeys\PatchSshKeysArchiveAction;
use MissionControlServers\SshKeys\PatchSshKeysUnArchiveAction;

class Routing
{
    public function onApplyRoutes(ApiApplyRoutesEvent $event): void
    {
        PatchSshKeysArchiveAction::registerRoute($event);
        PatchSshKeysUnArchiveAction::registerRoute($event);
        GetSshKeysListAction::registerRoute($event);
        GetSshKeysListArchivedAction::registerRoute($event);
        PostAddSshKeyAction::registerRoute($event);
        PatchEditSshKeyAction::registerRoute($event);
        PatchArchiveSshKeyAction::registerRoute($event);
        PatchUnArchiveSshKeyAction::registerRoute($event);
        GetDetailsBySlugAction::registerRoute($event);
        GetServersListAction::registerRoute($event);
        GetServersListArchivedAction::registerRoute($event);
        PostAddServerAction::registerRoute($event);
    }
}
