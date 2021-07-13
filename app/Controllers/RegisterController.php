<?php

namespace App\Controllers;

use App\Models\User;

class RegisterController extends Controller
{
    public function index()
    {
        echo $this->twig->render('/pages/register/index.html.twig', [
            'usernameMinCharacteres' => USER_NAME_MIN_CHARACTERES,
            'passwordMinCharacteres' => PASSWORD_MIN_CHARACTERES
        ]);
    }

    public function store()
    {
        
    }
}
