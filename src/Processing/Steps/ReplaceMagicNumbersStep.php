<?php
declare(strict_types=1);

namespace StephanSchuler\Presentation\Processing\Steps;

use StephanSchuler\Presentation\Processing\StepInterface;

class ReplaceMagicNumbersStep implements StepInterface
{
    const MAGIC_NUMBERS = [
        '(o_O)' => 'fragment',
        '(O_o)' => 'fragment',
    ];

    public function __invoke($content): string
    {
        $replace = [];
        foreach (self::MAGIC_NUMBERS as $number => $component) {
            $component = sprintf('<presentation-%1$s tabindex="%2$s"></presentation-%1$s>', $component, '%d');
            if (!isset($replace[$component])) {
                $replace[$component] = [];
                $replace[$component][] = preg_quote($number, '%');
            }
        }

        foreach ($replace as $component => $numbers) {
            $tabindex = 0;
            $numbers = '%(' . join(')|(', $numbers) . ')%';
            $content = preg_replace_callback($numbers, function ($match) use ($component, &$tabindex) {
                return sprintf($component, $tabindex++);
            }, $content);
        }

        return $content;
    }
}