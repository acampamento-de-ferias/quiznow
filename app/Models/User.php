<?php

namespace App\Models;

class User
{
    protected $table = 'users';
    
    private $id;
    private $name;
    private $email;
    private $password;

    public function __construct($id, $name, $email, $password) 
    {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
    }

    public function getUserArray()
    {
        if (!$this->id) {
            return [];
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email
        ];
    }

    public function getPassword()
    {
        return $this->password;
    }
}
