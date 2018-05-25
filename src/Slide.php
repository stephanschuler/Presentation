<?php
declare(strict_types=1);

namespace StephanSchuler\Presentation;

use StephanSchuler\Presentation\Processing\Pipe;
use StephanSchuler\Presentation\Processing\Steps\InlineImageSourcesStep;
use StephanSchuler\Presentation\Processing\Steps\LoadFileStep;
use StephanSchuler\Presentation\Processing\Steps\ParseMarkdownStep;
use StephanSchuler\Presentation\Processing\Steps\ReplaceMagicNumbersStep;
use StephanSchuler\Presentation\Processing\Steps\SplitColumnsStep;

class Slide
{
    const NODE_TEMPLATE = '<presentation-slide tabindex="%d" active="%s">%s</presentation-slide>';

    protected $tabindex;

    protected $steps;

    public function __construct(int $tabindex, \SplFileInfo $fileInfo, \Parsedown $parser, \DirectoryIterator $dataDirectory)
    {
        $this->tabindex = $tabindex;
        $this->steps = [
            new LoadFileStep($fileInfo),
            new ParseMarkdownStep($parser),
            new InlineImageSourcesStep($fileInfo, $dataDirectory),
            new SplitColumnsStep(),
            new ReplaceMagicNumbersStep(),
        ];
    }

    public
    function __toString(): string
    {
        $processor = new Pipe(...$this->steps);
        return vsprintf(self::NODE_TEMPLATE, [
            $this->tabindex,
            $this->tabindex === 0 ? 'true' : 'false',
            $processor->run()
        ]);
    }

}