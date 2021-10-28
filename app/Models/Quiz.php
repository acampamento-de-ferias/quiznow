<?php

namespace App\Models;

class Keyword
{
    protected $table = 'keywords';

    private $id;
    private $miniature;
    private $title;
    private $description;
    private $userId;
    private $categoryId;

    public function __construct($id, 
        $miniature, 
        $title, 
        $description, 
        $userId, 
        $categoryId)
    {
        $this->id = $id;
        $this->title = $title;
        $this->description = $description;
        $this->userId = $userId;
        $this->categoryId = $categoryId;
    }

}
