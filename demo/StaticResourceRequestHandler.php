<?php
declare(strict_types=1);

namespace StephanSchuler\Presentation\Demo;

class StaticResourceRequestHandler
{
    protected $sourceDirectory;

    public function __construct(string $sourceDirectory)
    {
        $this->sourceDirectory = realpath($sourceDirectory);
    }

    public function returnFile(string $filePath)
    {
        $filePath = trim($filePath, '/');

        if ($filePath === 'favicon.ico') {
            header('Not Found', true, 403);
            exit;
        }

        $filePath = realpath($this->sourceDirectory . '/' . $filePath);

        if (!$this->canHandle($filePath)) {
            return;
        }

        $this->mime($filePath);
        $this->echoContent($filePath);

        exit;
    }

    public function canHandle($filePath): bool
    {
        if (!$filePath) {
            return false;
        }
        if (strpos($filePath, $this->sourceDirectory . '/') !== 0) {
            return false;
        }
        if (file_exists($filePath) && is_file($filePath)) {
            return true;
        }
        return false;
    }

    protected function mime(string $filePath)
    {
        switch (strtolower(pathinfo($filePath, PATHINFO_EXTENSION))) {
            case 'js':
                header('Content-Type: application/javascript');
                break;
            case 'css':
                header('Content-Type: text/css');
                break;
            default:
                header('Content-Type: */*');
        }
    }

    protected function echoContent(string $filePath)
    {
        echo file_get_contents($filePath);
    }
}