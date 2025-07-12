<?php


namespace App\Models;


use App\Extensions\Published;
use App\Extensions\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Program extends Model
{
    use HasFactory,
        Searchable,
        SoftDeletes,
        Published;

    protected $fillable = [
        'title',
        'description',
    ];

    public $sortable = [
        'id'
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
