<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\AuthorizedKeys;

use MissionControlServers\Servers\Ssh\AuthorizedKeys\AuthorizedKeyCollection;

readonly class Payload
{
    public function __construct(
        public Status $status,
        public AuthorizedKeyCollection $keys = new AuthorizedKeyCollection(),
    ) {
    }
}
