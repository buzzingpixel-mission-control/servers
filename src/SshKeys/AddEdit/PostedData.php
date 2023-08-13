<?php

declare(strict_types=1);

namespace MissionControlServers\SshKeys\AddEdit;

use MissionControlServers\SshKeys\AddEdit\ValueObjects\Title;

readonly class PostedData
{
    /** @param string[] $data */
    public static function fromRawPostData(array $data): self
    {
        return new self(Title::fromNative($data['title'] ?? ''));
    }

    public function __construct(public Title $title)
    {
    }
}
