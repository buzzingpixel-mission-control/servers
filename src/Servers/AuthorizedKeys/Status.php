<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\AuthorizedKeys;

enum Status
{
    case SUCCESS;
    case FAILURE;
    case NOT_FOUND;
}
