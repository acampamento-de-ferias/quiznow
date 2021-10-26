<?php

namespace App\Models;

class Category
{
    protected $table = 'categories';

    private $id;
    private $title;

    public function __construct($id, $title)
    {
        $this->id = $id;
        $this->title = $title;
    }

}
