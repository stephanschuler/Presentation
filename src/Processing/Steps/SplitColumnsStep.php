<?php
declare(strict_types=1);

namespace StephanSchuler\Presentation\Processing\Steps;

use StephanSchuler\Presentation\Processing\StepInterface;

class SplitColumnsStep implements StepInterface
{
    const CONTAINER_TEMPLATE = '<article data-count="%d">%s</article>';

    const COLUMN_TEMPLATE = '<section>%s</section>';

    public function __invoke($content): string
    {
        $columns = preg_split('%<hr\s+/?>%i', $content);
        $columns = array_map(function ($column) {
            return sprintf(self::COLUMN_TEMPLATE, $column);
        }, $columns);
        return sprintf(self::CONTAINER_TEMPLATE, count($columns), join('', $columns));
    }
}