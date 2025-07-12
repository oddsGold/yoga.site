<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Role;
use Illuminate\Auth\Access\HandlesAuthorization;

abstract class BasePolicy
{
    use HandlesAuthorization;

    protected $model = null;

    public function viewAny(User $user)
    {
        return $this->hasPermission($user, 'view') ||
            $this->isAdmin($user) ||
            $this->isSuperAdmin($user);
    }

    public function view(User $user, $model)
    {
        return $this->hasPermission($user, 'view') ||
            $this->isAdmin($user) ||
            $this->isSuperAdmin($user);
    }

    public function create(User $user)
    {
        return $this->hasPermission($user, 'create') ||
            $this->isAdmin($user) ||
            $this->isSuperAdmin($user);
    }

    public function update(User $user, $model)
    {
        return $this->hasPermission($user, 'update') ||
            $this->isAdmin($user) ||
            $this->isSuperAdmin($user);
    }

    public function delete(User $user, $model)
    {
        return $this->hasPermission($user, 'delete') ||
            $this->isAdmin($user) ||
            $this->isSuperAdmin($user);
    }

    public function restore(User $user, $model)
    {
        return $this->hasPermission($user, 'delete') ||
            $this->isAdmin($user) ||
            $this->isSuperAdmin($user);
    }

    public function forceDelete(User $user, $model)
    {
        return $this->hasPermission($user, 'delete') ||
            $this->isAdmin($user) ||
            $this->isSuperAdmin($user);
    }

    protected function hasPermission($user, $name)
    {
        return $user->role->resource($this->getResource())->hasPermission($name);
    }

    protected function getResource()
    {
        return $this->model;
    }

    protected function isAdmin($user)
    {
        return $user->role->isAdmin();
    }

    protected function isSuperAdmin($user)
    {
        return $user->role->isSuperAdmin();
    }



}
