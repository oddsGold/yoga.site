<?php


namespace App\Policies\UserMemo;


use App\Models\UserMemo\UserMemo;
use App\Policies\BasePolicy;

class UserMemoPolicy extends BasePolicy
{
    protected $model = UserMemo::class;
}
