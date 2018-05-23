<?php
declare(strict_types=1);

namespace StephanSchuler\Presentation\Processing\Steps;

use StephanSchuler\Presentation\Processing\StepInterface;

class ParseMarkdownStep implements StepInterface
{
    protected $parser;

    public function __construct(\Parsedown $parser)
    {
        $this->parser = $parser;
    }

    public function __invoke($markdown): string
    {
        return $this->parser->parse($markdown);
    }
}