<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys;

use MissionControlServers\SshKeys\ValueObjects\PrivateKey;
use MissionControlServers\SshKeys\ValueObjects\PublicKey;
use MissionControlServers\SshKeys\ValueObjects\Slug;
use MissionControlServers\SshKeys\ValueObjects\Title;
use Spatie\Cloneable\Cloneable;

class NewSshKey
{
    use Cloneable;

    public function __construct(
        public Title $title,
        public PublicKey $public,
        public PrivateKey $private,
        public Slug $slug = new Slug(''),
    ) {
    }

    public function withSlugFromString(string $slug): static
    {
        return $this->with(slug: Slug::fromNative($slug));
    }
}
