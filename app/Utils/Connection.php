<?php

namespace App\Utils;

use Exception;
use PDO;

class Connection
{   
    private static $connection;

    public static function getConnection() {
        try {

            if (!isset(self::$connection)) {
                self::$connection = new PDO('mysql:host=db'.";port=3306".';dbname='.DB_NAME, DB_USERNAME, DB_PASSWORD);
                self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }

            return self::$connection;
        } catch (\PDOException $e) {
            throw new Exception("Falha na conexão com o banco de dados " . $e->getMessage());
        }
    }
    
}
