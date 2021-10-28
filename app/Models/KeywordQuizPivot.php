<?php

namespace App\Models;

class KeywordQuizPivot
{
    protected $table = 'keywords_quizzes';

    private $id;
    private $keywordId;
    private $quizId;

    public function __construct($id, $keywordId, $quizId)
    {
        $this->id = $id;
        $this->keywordId = $keywordId;
        $this->quizId = $quizId;
    }

}
