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

    public function login(array $data): User
    {
        $user = $this->userRepository->findByEmail($data['email']);

        if (!$user->getUserArray()) {
            throw new \Exception('Erro: usuário não existente');
        }

        if (!password_verify($data['password'], $user->getPassword())) {
            throw new \Exception('Erro: usuário não existente');
        }

        $_SESSION['user'] = $user->getUserArray();

        return $user;
    }

    public function insert(array $data): User
    {
        $userAlreadyExists = $this->userRepository->findByEmail($data['email'])->getUserArray();

        if ($userAlreadyExists) {
            throw new \Exception('Erro: usuário já existente');
        }
        
        $user = $this->userRepository->insert([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password']
        ]);

        $_SESSION['user'] = $user->getUserArray();

        return $user;
    }
}
