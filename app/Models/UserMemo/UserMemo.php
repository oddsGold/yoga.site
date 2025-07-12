<?php


namespace App\Models\UserMemo;


use App\Models\File;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserMemo extends Model
{

    use HasFactory;

    protected $table = 'user_memos';

    protected $fillable = [];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function type()
    {
        return $this->belongsTo(Type::class, 'type_id','id');
    }

    public function file()
    {
        return $this->belongsTo(File::class, 'file_id','id');
    }
}
