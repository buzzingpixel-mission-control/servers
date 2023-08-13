<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys\Generate;

use phpseclib3\Crypt\RSA;
use phpseclib3\Crypt\RSA\PrivateKey;

class PrivateKeyFactory
{
    public function create(): PrivateKey
    {
        return RSA::createKey(4096);
    }
}
