<?php

declare(strict_types=1);

namespace MissionControlServers\Servers\Persistence;

use MissionControlBackend\Persistence\CustomQueryParams;
use MissionControlBackend\Persistence\FetchParameters;
use MissionControlBackend\Persistence\Sort;
use MissionControlBackend\Persistence\StringCollection;

use function array_merge;
use function implode;

readonly class FindServerParameters extends FetchParameters
{
    public static function create(): self
    {
        return new self();
    }

    public static function getTableName(): string
    {
        return ServersTable::TABLE_NAME;
    }

    public function tableName(): string
    {
        return ServersTable::TABLE_NAME;
    }

    public function __construct(
        public bool|null $isActive = null,
        public StringCollection|null $projectIds = null,
        public StringCollection|null $notProjectIds = null,
        public StringCollection|null $titles = null,
        public StringCollection|null $notTitles = null,
        public StringCollection|null $slugs = null,
        public StringCollection|null $notSlugs = null,
        public StringCollection|null $sshKeyIds = null,
        public StringCollection|null $notSshKeyIds = null,
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

    public function withIsActive(bool|null $isActive): static
    {
        return $this->with(isActive: $isActive);
    }

    public function withProjectId(string $projectId): static
    {
        $projectIds = $this->projectIds ?? new StringCollection();

        return $this->with(
            projectIds: $projectIds->withString($projectId),
        );
    }

    public function withNotProjectId(string $notProjectId): static
    {
        $notProjectIds = $this->notProjectIds ?? new StringCollection();

        return $this->with(
            notProjectIds: $notProjectIds->withString($notProjectId),
        );
    }

    public function withTitle(string $title): static
    {
        $titles = $this->titles ?? new StringCollection();

        return $this->with(titles: $titles->withString($title));
    }

    public function withNotTitle(string $notTitle): static
    {
        $notTitles = $this->notTitles ?? new StringCollection();

        return $this->with(notTitles: $notTitles->withString($notTitle));
    }

    public function withSlug(string $slug): static
    {
        $slugs = $this->slugs ?? new StringCollection();

        return $this->with(slugs: $slugs->withString($slug));
    }

    public function withNotSlug(string $notSlug): static
    {
        $notSlugs = $this->notSlugs ?? new StringCollection();

        return $this->with(notSlugs: $notSlugs->withString($notSlug));
    }

    public function withSshKeyId(string $sshKeyId): static
    {
        $sshKeyIds = $this->sshKeyIds ?? new StringCollection();

        return $this->with(sshKeyIds: $sshKeyIds->withString($sshKeyId));
    }

    public function withNotSshKeyId(string $notSshKeyId): static
    {
        $notSshKeyIds = $this->notSshKeyIds ?? new StringCollection();

        return $this->with(notSshKeyIds: $notSshKeyIds->withString(
            $notSshKeyId,
        ));
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

        if ($this->isActive !== null) {
            $query[] = 'AND is_active = ' . ($this->isActive ? 'TRUE' : 'FALSE');
        }

        if (
            $this->projectIds !== null &&
            $this->projectIds->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->projectIds->map(
                static function (string $projectId) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'project_id_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $projectId;

                    $i++;
                },
            );

            $query[] = 'AND project_id IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->notProjectIds !== null &&
            $this->notProjectIds->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->notProjectIds->map(
                static function (string $notProjectId) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'not_project_id_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $notProjectId;

                    $i++;
                },
            );

            $query[] = 'AND project_id NOT IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->titles !== null &&
            $this->titles->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->titles->map(
                static function (string $title) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'title_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $title;

                    $i++;
                },
            );

            $query[] = 'AND title IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->notTitles !== null &&
            $this->notTitles->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->notTitles->map(
                static function (string $title) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'not_title_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $title;

                    $i++;
                },
            );

            $query[] = 'AND title NOT IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->slugs !== null &&
            $this->slugs->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->slugs->map(
                static function (string $slug) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'slug_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $slug;

                    $i++;
                },
            );

            $query[] = 'AND slug IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->notSlugs !== null &&
            $this->notSlugs->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->notSlugs->map(
                static function (string $slug) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'not_slug_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $slug;

                    $i++;
                },
            );

            $query[] = 'AND slug NOT IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->sshKeyIds !== null &&
            $this->sshKeyIds->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->sshKeyIds->map(
                static function (string $id) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'ssh_key_id_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $id;

                    $i++;
                },
            );

            $query[] = 'AND ssh_key_id IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->notSshKeyIds !== null &&
            $this->notSshKeyIds->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->notSshKeyIds->map(
                static function (string $id) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'not_ssh_key_id_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $id;

                    $i++;
                },
            );

            $query[] = 'AND ssh_key_id NOT IN (' .
                implode(',', $in) .
                ')';
        }

        return new CustomQueryParams(
            implode(' ', $query),
            $params,
        );
    }
}
