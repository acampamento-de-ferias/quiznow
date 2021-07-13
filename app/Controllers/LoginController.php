<?php

namespace App\Controllers;

use App\Models\User;

class LoginController extends Controller
{    
    public function index()
    {
        echo $this->twig->render('pages/login/index.html.twig');
    }

    public function store()
    {
        
    }
}
