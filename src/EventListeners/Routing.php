<?php

declare(strict_types=1);

namespace MissionControlServers\EventListeners;

use MissionControlBackend\Http\ApiApplyRoutesEvent;
use MissionControlServers\SshKeys\AddEdit\PatchArchiveSshKeyAction;
use MissionControlServers\SshKeys\AddEdit\PatchEditSshKeyAction;
use MissionControlServers\SshKeys\AddEdit\PatchUnArchiveSshKeyAction;
use MissionControlServers\SshKeys\AddEdit\PostAddSshKeyAction;
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
    }
}
