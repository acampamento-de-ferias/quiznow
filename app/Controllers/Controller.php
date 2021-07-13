<?php

namespace App\Controllers;

// use Twig\Environment;

class Controller
{
    protected $twig;

    public function __construct()
    {
        $loader = new \Twig\Loader\FilesystemLoader(PATH . '/templates');

        $twig = new \Twig\Environment($loader, [
            // 'cache' => __DIR__ . '/cache',
        ]);

        $twig->addGlobal('path', PATH);
        $twig->addGlobal('url', URL);

        $this->twig = $twig;
    }
}
