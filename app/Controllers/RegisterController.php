<?php

namespace App\Controllers;

use App\Models\User;

class RegisterController extends Controller
{
    public function index()
    {
        echo $this->twig->render('/pages/register/index.html.twig');
    }

    public function store()
    {
        
    }
}
