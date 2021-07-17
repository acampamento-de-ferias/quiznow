<?php

namespace App\Services;

use App\Repository\UserRepository;
use App\Models\User;

class UserService
{
    private $userRepository;

    public function __construct()
    {
        $this->userRepository = new UserRepository();
    }

    public function insert(array $data): User
    {
        $userAlreadyExists = $this->userRepository->findByEmail($data['email'])->getUserArray();

        if ($userAlreadyExists) {
            throw new \Exception('Erro: usuário já existente');
        }
        
        return $this->userRepository->insert([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password']
        ]);
    }
}
