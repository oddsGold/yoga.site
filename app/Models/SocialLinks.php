<?php


namespace App\Models;


use App\Extensions\Published;
use App\Extensions\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SocialLinks extends Model
{
    use HasFactory,
        Searchable,
        SoftDeletes,
        Published;

    protected $fillable = [
        'facebook',
        'instagram',
        'tik_tok',
        'you_tube',
        'telegram',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
