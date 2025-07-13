<?php


namespace App\Policies;


use App\Models\Author;

class AuthorPolicy extends BasePolicy
{
    protected $model = Author::class;
}
