<?php


namespace App\Policies\UserMemo;


use App\Models\UserMemo\Type;
use App\Policies\BasePolicy;

class TypePolicy extends BasePolicy
{
    protected $model = Type::class;
}
