<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use DateTimeImmutable;

use function preg_match_all;
use function preg_replace;
use function str_replace;
use function trim;

use const PREG_SET_ORDER;

readonly class PrepareCommand
{
    public function prepare(
        string $command,
        DateTimeImmutable $dateTime,
    ): string {
        $prepped = (string) str_replace(
            '{{timestamp}}',
            (string) $dateTime->getTimestamp(),
            $command,
        );

        // Find instances of {{time "FORMAT_HERE"}} or {{time 'FORMAT_HERE'}}
        preg_match_all(
            '/{{time (?:"|\')(.+?)(?:"|\')}}/',
            $prepped,
            $timeMatches,
            PREG_SET_ORDER,
        );

        // Do replacements
        foreach ($timeMatches as $match) {
            $replacement = $dateTime->format($match[1]);

            $prepped = (string) preg_replace(
                '/' . $match[0] . '/',
                $replacement,
                $prepped,
                1,
            );
        }

        return trim($prepped);
    }
}
