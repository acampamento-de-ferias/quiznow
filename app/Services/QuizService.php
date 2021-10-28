<?php

namespace App\Services;

use App\Repository\QuizRepository;
use App\Repository\CategoryRepository;
use App\Repository\KeywordRepository;
use App\Repository\QuestionRepository;
use App\Repository\AnswerRepository;

use App\Models\Quiz;

class QuizService
{
    private $quizRepository;
    private $categoryRepository;
    private $keywordRepository;
    private $questionRepository;
    private $answerRepository;

    public function __construct()
    {
        $this->quizRepository     = new QuizRepository();
        $this->categoryRepository = new CategoryRepository();
        $this->keywordRepository  = new KeywordRepository();
        $this->questionRepository = new QuestionRepository();
        $this->answerRepository   = new AnswerRepository();
    }

    /**
     * Create new quiz
     * 
     */
    public function insert(array $data): Quiz
    {
        // salva dados do quiz
        // busca o id da categoria by title
        // insere/edita nova keyword
        // cria question and answers
    }
}
