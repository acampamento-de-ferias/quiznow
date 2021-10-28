<?php

namespace App\Models;

class Answer
{
    protected $table = 'categories';

    private $id;
    private $title;
    private $questionId;

    public function __construct($id, $title, $questionId)
    {
        $this->id = $id;
        $this->title = $title;
        $this->questionId = $questionId;
    }

}
