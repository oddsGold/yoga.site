<?php

namespace App\Models;

use App\Models\Admin\Menu;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Resource extends Model
{
    use HasFactory,
        SoftDeletes;

    protected $fillable = [
        'name',
        'label'
    ];

    public function scopeName($query, $name)
    {
        return $query->where('name', $name);
    }

    public static function findIdByName($name)
    {
        return (int)self::name($name)->value('id');
    }

    public function menus()
    {
        return $this->hasMany(Menu::class);
    }

}
