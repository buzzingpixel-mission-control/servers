<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\Persistence;

use MissionControlBackend\Persistence\CustomQueryParams;
use MissionControlBackend\Persistence\FetchParameters;
use MissionControlBackend\Persistence\Sort;
use MissionControlBackend\Persistence\StringCollection;

use function array_merge;
use function implode;

readonly class FindPipelineJobParameters extends FetchParameters
{
    public static function create(): self
    {
        return new self();
    }

    public static function getTableName(): string
    {
        return PipelineJobsTable::TABLE_NAME;
    }

    public function tableName(): string
    {
        return PipelineJobsTable::TABLE_NAME;
    }

    public function __construct(
        public StringCollection|null $pipelineIds = null,
        public StringCollection|null $notPipelineIds = null,
        public bool|null $hasStarted = null,
        public bool|null $isFinished = null,
        public bool|null $hasFailed = null,
        StringCollection|null $ids = null,
        StringCollection|null $notIds = null,
        int|null $limit = null,
        int|null $offset = null,
        string|null $orderBy = null,
        Sort|null $sort = null,
    ) {
        parent::__construct(
            $ids,
            $notIds,
            $limit,
            $offset,
            $orderBy,
            $sort,
        );
    }

    public function withPipelineId(string $pipelineId): static
    {
        $pipelineIds = $this->pipelineIds ?? new StringCollection();

        return $this->with(
            pipelineIds: $pipelineIds->withString($pipelineId),
        );
    }

    public function withNotPipelineId(string $notPipelineId): static
    {
        $notPipelineIds = $this->notPipelineIds ?? new StringCollection();

        return $this->with(
            notPipelineIds: $notPipelineIds->withString($notPipelineId),
        );
    }

    public function withHasStarted(bool|null $hasStarted): static
    {
        return $this->with(hasStarted: $hasStarted);
    }

    public function withIsFinished(bool|null $isFinished): static
    {
        return $this->with(isFinished: $isFinished);
    }

    public function withHasFailed(bool|null $hasFailed): static
    {
        return $this->with(hasFailed: $hasFailed);
    }

    public function buildQuery(
        callable|null $buildCustomQuerySection = null,
    ): CustomQueryParams {
        $internalCustomQuery = $this->buildInternalCustomQuery();

        if ($buildCustomQuerySection === null) {
            $buildCustomQuerySection = $internalCustomQuery;
        } else {
            $build = $buildCustomQuerySection();

            $buildCustomQuerySection = new CustomQueryParams(
                $build->query . ' ' . $internalCustomQuery->query,
                array_merge(
                    $build->params,
                    $internalCustomQuery->params,
                ),
            );
        }

        return parent::buildQuery(
            static fn () => $buildCustomQuerySection,
        );
    }

    private function buildInternalCustomQuery(): CustomQueryParams
    {
        $params = [];

        $query = [];

        if (
            $this->pipelineIds !== null &&
            $this->pipelineIds->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->pipelineIds->map(
                static function (string $pipelineId) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'pipeline_id_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $pipelineId;

                    $i++;
                },
            );

            $query[] = 'AND pipeline_id IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->notPipelineIds !== null &&
            $this->notPipelineIds->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->notPipelineIds->map(
                static function (string $notPipelineId) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'not_pipeline_id_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $notPipelineId;

                    $i++;
                },
            );

            $query[] = 'AND pipeline_id NOT IN (' .
                implode(',', $in) .
                ')';
        }

        if ($this->hasStarted !== null) {
            $query[] = 'AND has_started = ' . (
                $this->hasStarted ?
                    'TRUE' :
                    'FALSE'
            );
        }

        if ($this->isFinished !== null) {
            $query[] = 'AND is_finished = ' . (
                $this->isFinished ?
                    'TRUE' :
                    'FALSE'
                );
        }

        if ($this->hasFailed !== null) {
            $query[] = 'AND has_failed = ' . (
                $this->hasFailed ?
                    'TRUE' :
                    'FALSE'
                );
        }

        return new CustomQueryParams(
            implode(' ', $query),
            $params,
        );
    }
}
