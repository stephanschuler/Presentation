<?php
declare(strict_types=1);

namespace StephanSchuler\Presentation\Processing\Steps;

use StephanSchuler\Presentation\Processing\StepInterface;

class LoadFileStep implements StepInterface
{
    protected $fileInfo;

    public function __construct(\SplFileInfo $fileInfo)
    {
        $this->fileInfo = $fileInfo;
    }

    public function __invoke($_): string
    {
        return file_get_contents($this->fileInfo->getPathname());
    }
}