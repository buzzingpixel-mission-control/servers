<?php

declare(strict_types=1);

namespace MissionControlServers\EventListeners;

use MissionControlBackend\Http\ApiApplyRoutesEvent;
use MissionControlServers\Pipelines\AddEdit\PatchEditPipelineAction;
use MissionControlServers\Pipelines\AddEdit\PostAddPipelineAction;
use MissionControlServers\Pipelines\GetDetails\GetDetailsBySlugAction;
use MissionControlServers\Pipelines\GetPipelinesListAction;
use MissionControlServers\Pipelines\GetPipelinesListArchivedAction;
use MissionControlServers\Pipelines\Jobs\PostRunPipelineAction;
use MissionControlServers\Pipelines\Jobs\RecentRuns\GetRecentRunsListAction;
use MissionControlServers\Pipelines\Jobs\WebhookTriggerAction;
use MissionControlServers\Servers\AddEdit\PatchArchiveServerAction;
use MissionControlServers\Servers\AddEdit\PatchEditServerAction;
use MissionControlServers\Servers\AddEdit\PatchUnArchiveServerAction;
use MissionControlServers\Servers\AddEdit\PostAddServerAction;
use MissionControlServers\Servers\AuthorizedKeys\Add\PostAddAuthorizedKeyAction;
use MissionControlServers\Servers\AuthorizedKeys\GetAuthorizedKeysAction;
use MissionControlServers\Servers\GetDetails\GetDetailsBySlugAction as GetServerDetailsBySlugAction;
use MissionControlServers\Servers\GetServersListAction;
use MissionControlServers\Servers\GetServersListArchivedAction;
use MissionControlServers\Servers\PatchServersArchiveAction;
use MissionControlServers\Servers\PatchServersUnArchiveAction;
use MissionControlServers\SshKeys\AddEdit\PatchArchiveSshKeyAction;
use MissionControlServers\SshKeys\AddEdit\PatchEditSshKeyAction;
use MissionControlServers\SshKeys\AddEdit\PatchUnArchiveSshKeyAction;
use MissionControlServers\SshKeys\AddEdit\PostAddSshKeyAction;
use MissionControlServers\SshKeys\GetDetails\GetDetailsBySlugAction as GetSshKeyDetailsBySlugAction;
use MissionControlServers\SshKeys\GetSshKeysListAction;
use MissionControlServers\SshKeys\GetSshKeysListArchivedAction;
use MissionControlServers\SshKeys\PatchSshKeysArchiveAction;
use MissionControlServers\SshKeys\PatchSshKeysUnArchiveAction;

class Routing
{
    public function onApplyRoutes(ApiApplyRoutesEvent $event): void
    {
        /**
         * SSH Keys
         */
        PatchSshKeysArchiveAction::registerRoute($event);
        PatchSshKeysUnArchiveAction::registerRoute($event);
        GetSshKeysListAction::registerRoute($event);
        GetSshKeysListArchivedAction::registerRoute($event);
        PostAddSshKeyAction::registerRoute($event);
        PatchEditSshKeyAction::registerRoute($event);
        PatchArchiveSshKeyAction::registerRoute($event);
        PatchUnArchiveSshKeyAction::registerRoute($event);
        GetSshKeyDetailsBySlugAction::registerRoute($event);

        /**
         * Servers
         */
        GetServersListAction::registerRoute($event);
        GetServersListArchivedAction::registerRoute($event);
        PostAddServerAction::registerRoute($event);
        PatchArchiveServerAction::registerRoute($event);
        PatchUnArchiveServerAction::registerRoute($event);
        PatchServersArchiveAction::registerRoute($event);
        PatchServersUnArchiveAction::registerRoute($event);
        PatchEditServerAction::registerRoute($event);
        GetServerDetailsBySlugAction::registerRoute($event);
        GetAuthorizedKeysAction::registerRoute($event);
        PostAddAuthorizedKeyAction::registerRoute($event);

        /**
         * Pipelines
         */
        GetPipelinesListAction::registerRoute($event);
        GetPipelinesListArchivedAction::registerRoute($event);
        PostAddPipelineAction::registerRoute($event);
        GetDetailsBySlugAction::registerRoute($event);
        PatchEditPipelineAction::registerRoute($event);
        PostRunPipelineAction::registerRoute($event);
        WebhookTriggerAction::registerRoute($event);
        GetRecentRunsListAction::registerRoute($event);
    }
}
