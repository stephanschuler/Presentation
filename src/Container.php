<?php
declare(strict_types=1);

namespace StephanSchuler\Presentation;

class Container
{
    const NODE_TEMPLATE = '<presentation-container loading="true">%s</presentation-container>';

    const DEFAULT_TEMPLATE_PATH = __DIR__ . '/../Resources/Public/Scripts/index.html';

    protected $dataDirectory;

    protected $parser;

    public function __construct(\DirectoryIterator $dataDirectory)
    {
        $this->dataDirectory = $dataDirectory;
    }

    public function setParse(\Parsedown $parser)
    {
        $this->parser = $parser;
    }

    public function render(string $templatePath = self::DEFAULT_TEMPLATE_PATH): string
    {
        $parser = $this->getParse();
        $parser->setSafeMode(true);
        $parser->setUrlsLinked(true);
        $parser->setBreaksEnabled(true);

        $files = new \RegexIterator(new \RecursiveIteratorIterator($this->dataDirectory), '/^.+\.md/i', \RecursiveRegexIterator::MATCH);
        $slides = $this->getSlideObjects($files, $parser);

        return str_replace(
            '<!-- slot -->',
            sprintf(self::NODE_TEMPLATE, join('', iterator_to_array($slides))),
            file_get_contents($templatePath)
        );
    }

    protected function getSlideObjects(\Traversable $fileInfos, \Parsedown $parser)
    {
        $tabIndex = 0;
        foreach ($fileInfos as $fileInfo) {
            yield new Slide($tabIndex++, $fileInfo, $parser, $this->dataDirectory);
        }
    }

    protected function getParse(): \Parsedown
    {
        if (!$this->parser) {
            $this->parser = new \Parsedown();
            $this->parser->setSafeMode(true);
            $this->parser->setUrlsLinked(true);
            $this->parser->setBreaksEnabled(true);
        }
        return $this->parser;
    }
}