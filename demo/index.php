<?php

use Composer\Autoload\ClassLoader;
use StephanSchuler\Presentation\Container;
use StephanSchuler\Presentation\Demo\StaticResourceRequestHandler;

/** @var ClassLoader $autoloader */
$autoloader = require_once __DIR__ . '/../vendor/autoload.php';
$autoloader->addPsr4('StephanSchuler\\Presentation\\Demo\\', __DIR__ . '/src', true);

$static = new StaticResourceRequestHandler(__DIR__ . '/../Resources/Public/App');
$static->returnFile($_SERVER['PHP_SELF']);

$presentation = new Container(new RecursiveDirectoryIterator(__DIR__ . '/../demo/slides'));
echo $presentation->render(__DIR__ . '/../Resources/Public/App/index.html');