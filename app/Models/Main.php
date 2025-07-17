<?php


namespace App\Models;


use App\Extensions\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Main extends Model
{
    use HasFactory,
        Searchable,
        SoftDeletes;

    protected $fillable = [
        'title',
        'description_1',
        'description_2',
    ];

    public $sortable = [
        'id'
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
