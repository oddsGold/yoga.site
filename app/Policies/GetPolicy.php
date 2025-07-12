<?php


namespace App\Policies;


use App\Models\Get;

class GetPolicy extends BasePolicy
{
    protected $model = Get::class;
}
