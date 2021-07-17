<?php

namespace App\Controllers;

use App\Services\UserService;

class RegisterController extends Controller
{
    public function index()
    {
        echo $this->twig->render('/pages/register/index.html.twig');
    }

    public function store()
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            $data['name'] = filter_var($data['name'], FILTER_SANITIZE_STRING);
            $data['email'] = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
            $data['password'] = filter_var($data['password'], FILTER_SANITIZE_STRING);
            
            $service = new UserService();
            $user = $service->insert($data);

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
