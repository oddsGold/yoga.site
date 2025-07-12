<?php


namespace App\Models;


use App\Extensions\Published;
use App\Extensions\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Faq extends Model
{
    use HasFactory,
        Searchable,
        SoftDeletes,
        Published;

    protected $fillable = [
        'title',
        'description',
        'published',
        'published_at',
        'published_to',
    ];

    protected $dates = ['published_at', 'published_to'];

    public $sortable = [
        'id',
        'title'
    ];

    protected $searchable = [
        'title',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
