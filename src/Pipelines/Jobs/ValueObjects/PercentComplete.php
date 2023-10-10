<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\ValueObjects;

use Funeralzone\ValueObjects\ValueObject;
use InvalidArgumentException;

use function max;
use function min;

// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingNativeTypeHint
// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingAnyTypeHint

readonly class PercentComplete implements ValueObject
{
    private float $value;

    public function __construct(float|int $value)
    {
        if ($value > 100 || $value < 0) {
            throw new InvalidArgumentException(
                'Number must be between 0 and 100',
            );
        }

        $this->value = (float) $value;
    }

    public function isNull(): bool
    {
        return false;
    }

    public function isSame(ValueObject $object): bool
    {
        return $this->toNative() === $object->toNative();
    }

    /**
     * @param float|int $native
     *
     * @phpstan-ignore-next-line
     */
    public static function fromNative($native): self
    {
        return self::internalFromNative($native);
    }

    private static function internalFromNative(int|float $native): self
    {
        return new self(max(
            min(
                $native,
                100,
            ),
            0,
        ));
    }

    public function toNative(): float
    {
        return $this->value;
    }
}
