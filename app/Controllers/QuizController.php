<?php

namespace App\Controllers;

use App\Services\QuizService;
class QuizController extends Controller
{
    public function index()
    {
        echo $this->twig->render('pages/create-quiz/index.html.twig');
    }

    public function store()
    {
        try {
            $data = json_decode(file_get_contents('php://input'), true);

            $service = new QuizService();
            $quiz = $service->insert($data);

            echo json_encode([
                'status' => 201,
            ]);
        } catch (\Exception $e) {
            echo json_encode([
                'status' => 400,
                'message' => $e->getMessage()
            ]);
        }
    }

}
