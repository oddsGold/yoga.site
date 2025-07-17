<?php


namespace App\Models;


use App\Extensions\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory,
        Searchable,
        SoftDeletes;

    protected $fillable = [
        'name',
        'price',
        'description',
        'currency',
        'is_active'
    ];



    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
