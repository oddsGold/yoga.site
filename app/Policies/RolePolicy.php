<?php


namespace App\Policies;


use App\Models\User;

class RolePolicy extends BasePolicy
{
    public function before(User $user, $ability)
    {
        return $this->isSuperAdmin($user) || $this->isAdmin($user);
    }
}
