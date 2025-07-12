<?php


namespace App\Models;


use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Image extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'origin',
        'path',
        'size',
        'type'
    ];

    public $sortable = [
        'id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function getPathAndName()
    {
        return $this->path . '/' . $this->name;
    }

}
