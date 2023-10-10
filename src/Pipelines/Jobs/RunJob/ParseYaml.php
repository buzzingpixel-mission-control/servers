<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines\Jobs\RunJob;

use Symfony\Component\Yaml\Yaml;

use function is_array;

readonly class ParseYaml
{
    public function __construct(private YamlResultTransformer $transformer)
    {
    }

    public function fromString(string $rawYaml): YamlResult
    {
        $yamlArray = Yaml::parse($rawYaml);

        $yamlArray = is_array($yamlArray) ? $yamlArray : [];

        return $this->transformer->fromArray($yamlArray);
    }
}
