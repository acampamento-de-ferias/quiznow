<?php

use CoffeeCode\Router\Router;

$router = new Router(URL);
$router->namespace("App\Controllers");

$router->group(null);
$router->get("/register", "RegisterController:index");
$router->get("/login", "LoginController:index");

$router->dispatch();
