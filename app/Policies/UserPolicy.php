<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy extends BasePolicy
{

    public function before(User $user, $ability)
    {
        return $this->isSuperAdmin($user) || $this->isAdmin($user);
    }

 //   protected $model = User::class;

//    public function viewAny(User $user)
//    {
//        return $this->isSuperAdmin($user);
//    }
//
//    public function view(User $user, $model)
//    {
//        return $this->isSuperAdmin($user);
//    }
//
//    public function create(User $user)
//    {
//        return $this->isSuperAdmin($user);
//    }
//
//    public function update(User $user, $model)
//    {
//        return $this->isSuperAdmin($user) || $user->id == $model->id;
//    }
//
//    public function delete(User $user, $model)
//    {
//        return $this->isSuperAdmin($user);
//    }
//
//    public function restore(User $user, $model)
//    {
//        return $this->isSuperAdmin($user);
//    }
//
//    public function forceDelete(User $user, $model)
//    {
//        return $this->isSuperAdmin($user);
//    }

}
