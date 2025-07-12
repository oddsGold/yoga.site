<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class RoleResource extends Pivot
{

    public $incrementing = true;


    public function scopePermission($query)
    {
        return $query->where('permission_id', 1);
    }

}
