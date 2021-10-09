<?php

namespace App\Controllers;

class QuizController extends Controller
{
    public function index()
    {
        echo $this->twig->render('pages/create-quiz/index.html.twig');
    }

    public function store()
    {

    }
}
