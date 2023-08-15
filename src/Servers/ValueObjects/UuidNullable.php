<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\ValueObjects;

use Funeralzone\ValueObjects\ValueObject;
use InvalidArgumentException;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\UuidInterface;

use function is_string;

// phpcs:disable SlevomatCodingStandard.TypeHints.PropertyTypeHint.MissingAnyTypeHint
// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingNativeTypeHint
// phpcs:disable SlevomatCodingStandard.TypeHints.ReturnTypeHint.MissingNativeTypeHint

trait UuidNullable
{
    public function __construct(protected UuidInterface|null $uuid)
    {
    }

    public function isNull(): bool
    {
        return $this->uuid === null;
    }

    public function isSame(ValueObject $object): bool
    {
        return $this->toNative() === $object->toNative();
    }

    /**
     * @param string|null $native
     *
     * @return static
     */
    public static function fromNative($native)
    {
        if ($native === null) {
            return new static(null);
        }

        if (! is_string($native)) {
            throw new InvalidArgumentException(
                'Can only instantiate this object with a string.',
            );
        }

        $uuid = Uuid::fromString($native);

        return new static($uuid);
    }

    public function toNative(): string|null
    {
        return $this->uuid?->toString();
    }
}
