<?php

namespace App\Models;

class Keyword
{
    protected $table = 'keywords';

    private $id;
    private $title;

    public function __construct($id, $title)
    {
        $this->id = $id;
        $this->title = $title;
    }

}