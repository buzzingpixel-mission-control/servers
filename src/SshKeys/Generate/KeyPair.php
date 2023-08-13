<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys\Generate;

use MissionControlServers\SshKeys\Generate\ValueObjects\PrivateKey;
use MissionControlServers\SshKeys\Generate\ValueObjects\PublicKey;

readonly class KeyPair
{
    public function __construct(
        public PrivateKey $privateKey,
        public PublicKey $publicKey,
    ) {
    }
}
