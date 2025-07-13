<?php


namespace App\Models;


use App\Extensions\Published;
use App\Extensions\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Learning extends Model
{
    use HasFactory,
        Searchable,
        SoftDeletes,
        Published;

    protected $fillable = [
        'title',
        'description',
        'published'
    ];

    public function scopePublished($query)
    {
        return $query->where('published', true);
    }


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
