<?php

use CoffeeCode\Router\Router;

$router = new Router(URL);
$router->namespace("App\Controllers");

$router->group(null);

// Home
$router->get("/", "HomeController:index");

// Register
$router->get("/register", "RegisterController:index");
$router->post("/register", "RegisterController:store");

// Login
$router->get("/login", "LoginController:index");
$router->post("/login", "LoginController:login");

// Create Quiz
$router->get("/create-quiz", "QuizController:index");
$router->post("/create-quiz", "QuizController:store");

$router->dispatch();
