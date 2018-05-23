<?php
declare(strict_types=1);

namespace StephanSchuler\Presentation\Processing;

interface StepInterface
{
    public function __invoke($value);
}