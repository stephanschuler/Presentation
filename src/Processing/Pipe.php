<?php
declare(strict_types=1);

namespace StephanSchuler\Presentation\Processing;

class Pipe
{
    protected $steps;

    public function __construct(StepInterface ...$steps)
    {
        $this->steps = $steps;
    }

    public function run($value = null)
    {
        return array_reduce($this->steps, function ($carry, callable $item) {
            return $item($carry);
        }, $value);
    }

    public function __invoke($value)
    {
        return $this->run($value);
    }
}