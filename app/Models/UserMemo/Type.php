<?php


namespace App\Models\UserMemo;


use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    use HasFactory;

    const SOTA_CRS = 1;
    const SOTA_API_CRS = 2;

    protected $table = 'user_memo_types';

    protected $fillable = [
        'title',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function userMemos()
    {
        return $this->hasMany(UserMemo::class, 'type_id', 'id');
    }

    public function getLastUserMemo()
    {
        if($useMemo = $this->userMemos()->latest()->first()){
            return $useMemo;
        }
        return null;
    }
}
