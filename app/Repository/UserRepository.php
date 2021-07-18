<?php

namespace App\Repository;

use App\Models\User;
use App\Utils\Connection;

class UserRepository extends User
{
    private $connection;

    public function __construct()
    {
        $this->connection = Connection::getConnection();
    }

    public function find(int $id): User
    {
        $sql = "SELECT * FROM {$this->table} WHERE {$this->table}.id = :id";
        $statement = $this->connection->prepare($sql);
        $statement->bindParam(':id', $id, $this->connection::PARAM_INT);
        $results = $statement->execute();

        if (!$results) {
            throw new \Exception('Erro: não foi possível buscar o usuário pelo código');
        }

        $user = $statement->fetch($this->connection::FETCH_ASSOC);

        return new User($user['id'], $user['name'], $user['email'], $user['password']);
    }
    
    public function findByEmail(string $email): User
    {
        $sql = "SELECT * FROM {$this->table} WHERE {$this->table}.email = :email";
        $statement = $this->connection->prepare($sql);
        $statement->bindParam(':email', $email, $this->connection::PARAM_STR);
        $results = $statement->execute();

        if (!$results) {
            throw new \Exception('Erro: não foi possível buscar o usuário pelo email');
        }

        $user = $statement->fetch($this->connection::FETCH_ASSOC);

        return new User($user['id'], $user['name'], $user['email'], $user['password']);
    }

    public function insert(array $data): User 
    {
        $passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);
        
        $sql = "INSERT INTO {$this->table} (name, email, password, created_at, updated_at) VALUES (:name, :email, :password, NOW(), NOW())";
        $statement = $this->connection->prepare($sql);
        $statement->bindParam(':name', $data['name'], $this->connection::PARAM_STR);
        $statement->bindParam(':email', $data['email'], $this->connection::PARAM_STR);
        $statement->bindParam(':password', $passwordHash, $this->connection::PARAM_STR);

        $result = $statement->execute();

        if (!$result) {
            throw new \Exception('Erro: não foi possível inserir um novo usuário');
        }

        return $this->find($this->connection->lastInsertId());
    }
}
