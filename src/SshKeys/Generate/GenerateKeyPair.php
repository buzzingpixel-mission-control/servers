<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys\Generate;

use MissionControlServers\SshKeys\Generate\ValueObjects\PrivateKey;
use MissionControlServers\SshKeys\Generate\ValueObjects\PublicKey;

use function assert;
use function is_string;

readonly class GenerateKeyPair
{
    public function __construct(private PrivateKeyFactory $privateKeyFactory)
    {
    }

    public function generate(): KeyPair
    {
        $key = $this->privateKeyFactory->create();

        $publicKey = $key->getPublicKey();

        assert($publicKey instanceof \phpseclib3\Crypt\RSA\PublicKey);

        $publicKeyString = $publicKey->toString('openssh');

        assert(is_string($publicKeyString));

        return new KeyPair(
            PrivateKey::fromNative(
                $key->toString('openssh'),
            ),
            PublicKey::fromNative($publicKeyString),
        );
    }
}
