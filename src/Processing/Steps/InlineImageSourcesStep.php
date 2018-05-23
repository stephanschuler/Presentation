<?php
declare(strict_types=1);

namespace StephanSchuler\Presentation\Processing\Steps;

use StephanSchuler\Presentation\Processing\StepInterface;

class InlineImageSourcesStep implements StepInterface
{
    const PATTERN_FROM = '%<img src="(?<file>[^"]+\\.(?<type>[a-z]+))"%i';

    const PATTERN_TO = '<img src="data:image/%s;base64,%s"';

    protected $sourceFile;

    protected $dataDirectory;

    public function __construct(\SplFileInfo $sourceFile, \DirectoryIterator $dataDirectory)
    {
        $this->sourceFile = $sourceFile;
        $this->dataDirectory = $dataDirectory;
    }

    public function __invoke($html): string
    {
        $path = realpath($this->dataDirectory->getPath()) . '/';
        if (!is_string($path) || !$path) {
            return $html;
        }
        return preg_replace_callback(self::PATTERN_FROM, function ($matches) use ($path) {
            $relativePath = realpath($this->sourceFile->getPath() . '/' . $matches[1]);
            if (!is_string($relativePath) || !$relativePath || !is_file($relativePath)) {
                return $matches[0];
            }
            return sprintf(self::PATTERN_TO, $matches['type'], base64_encode(file_get_contents($relativePath)));

        }, $html);
    }
}