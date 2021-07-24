<?php

namespace App\Controllers;

use App\Services\UserService;

class LoginController extends Controller
{    
    public function index()
    {
        echo $this->twig->render('pages/login/index.html.twig');
    }

    public function login()
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            $data['email'] = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
            $data['password'] = filter_var($data['password'], FILTER_SANITIZE_STRING);
            
            $service = new UserService();
            $user = $service->login([
                'email' => $data['email'],
                'password' => $data['password']
            ]);

            echo json_encode([
                'status' => 201,
                'user' => $user->getUserArray()
            ]);
        } catch (\Exception $e) {
            echo json_encode([
                'status' => 400,
                'message' => $e->getMessage()
            ]);
        }
    }
}
