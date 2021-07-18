<?php

namespace App\Controllers;

use App\Models\User;

class HomeController extends Controller
{    
    public function index()
    {       
        echo $this->twig->render('pages/home/index.html.twig');
    }

}
