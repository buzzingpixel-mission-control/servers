<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Specialized;

enum SpecialCases: string
{
    case LOCAL_SHELL_ID   = 'a367434a-d684-499f-9670-3798e97862e0';
    case LOCAL_SHELL_SLUG = 'local-shell';
    case LOCAL_SHELL_NAME = 'Local Shell';
}
