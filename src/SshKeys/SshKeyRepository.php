<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys;

use Cocur\Slugify\Slugify;
use MissionControlBackend\ActionResult;
use MissionControlServers\SshKeys\Generate\GenerateKeyPair;
use MissionControlServers\SshKeys\Persistence\CreateSshKey;
use MissionControlServers\SshKeys\Persistence\FindSshKeyParameters;
use MissionControlServers\SshKeys\Persistence\FindSshKeys;
use MissionControlServers\SshKeys\Persistence\SaveSshKey;
use MissionControlServers\SshKeys\Persistence\SshKeyRecord;
use MissionControlServers\SshKeys\ValueObjects\PrivateKey;
use MissionControlServers\SshKeys\ValueObjects\PublicKey;
use MissionControlServers\SshKeys\ValueObjects\Title;

readonly class SshKeyRepository
{
    public function __construct(
        private Slugify $slugify,
        private SaveSshKey $save,
        private FindSshKeys $find,
        private CreateSshKey $create,
        private GenerateKeyPair $generateKeyPair,
    ) {
    }

    public function generateSshKey(string $title): NewSshKey
    {
        $key = $this->generateKeyPair->generate();

        return new NewSshKey(
            Title::fromNative($title),
            PublicKey::fromNative($key->publicKey->toNative()),
            PrivateKey::fromNative($key->privateKey->toNative()),
        );
    }

    public function createSshKey(NewSshKey $entity): ActionResult
    {
        return $this->create->create(
            SshKeyRecord::fromNewEntity(
                $entity->withSlugFromString(
                    $this->slugify->slugify(
                        $entity->title->toNative(),
                    ),
                ),
            ),
        );
    }

    public function saveSshKey(SshKey $entity): ActionResult
    {
        return $this->save->save(
            SshKeyRecord::fromEntity(
                $entity->withSlugFromString(
                    $this->slugify->slugify(
                        $entity->title->toNative(),
                    ),
                ),
            ),
        );
    }

    public function findOne(
        FindSshKeyParameters|null $parameters = null,
    ): SshKey {
        return SshKey::fromRecord(
            $this->find->findOne($parameters),
        );
    }

    public function findOneOrNull(
        FindSshKeyParameters|null $parameters = null,
    ): SshKey|null {
        $record = $this->find->findOneOrNull($parameters);

        if ($record === null) {
            return null;
        }

        return SshKey::fromRecord($record);
    }

    public function findAll(
        FindSshKeyParameters|null $parameters = null,
    ): SshKeyCollection {
        $records = $this->find->findAll($parameters);

        /** @phpstan-ignore-next-line */
        return new SshKeyCollection($records->map(
            static fn (SshKeyRecord $record) => SshKey::fromRecord(
                $record,
            )
        ));
    }
}
