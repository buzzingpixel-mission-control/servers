<?php

declare(strict_types=1);

namespace MissionControlServers\Pipelines;

use MissionControlServers\Pipelines\ValueObjects\Description;
use MissionControlServers\Pipelines\ValueObjects\PipelineId;
use MissionControlServers\Pipelines\ValueObjects\RunAfterFail;
use MissionControlServers\Pipelines\ValueObjects\RunOnServers;
use MissionControlServers\Pipelines\ValueObjects\Script;
use MissionControlServers\Pipelines\ValueObjects\Type;
use Spatie\Cloneable\Cloneable;

class NewPipelineItem
{
    use Cloneable;

    public function __construct(
        public PipelineId $pipelineId,
        public Type $type,
        public Description $description = new Description(''),
        public Script $script = new Script(''),
        public RunOnServers $runOnServers = new RunOnServers(),
        public RunAfterFail $runAfterFail = new RunAfterFail(false),
    ) {
    }
}
