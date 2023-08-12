<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys;

use MissionControlServers\SshKeys\ValueObjects\PrivateKey;
use MissionControlServers\SshKeys\ValueObjects\PublicKey;
use MissionControlServers\SshKeys\ValueObjects\Slug;
use MissionControlServers\SshKeys\ValueObjects\Title;

class NewSshKey
{
    public function __construct(
        public Title $title,
        public Slug $slug,
        public PublicKey $public,
        public PrivateKey $private,
    ) {
    }
}
