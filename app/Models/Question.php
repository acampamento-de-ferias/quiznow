<?php

namespace App\Models;

class Question
{
    protected $table = 'questions';

    private $id;
    private $title;
    private $quizId;

    public function __construct($id, $title, $quizId)
    {
        $this->id = $id;
        $this->title = $title;
        $this->quizId = $quizId;
    }

}
