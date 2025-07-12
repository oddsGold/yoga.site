<?php

namespace App\Models\Admin\Auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\SoftDeletes;

class RefreshToken extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'token',
        'user_agent',
        'ip_address',
        'expiration_in',
    ];


    public function user(){
        return $this->belongsTo(User::class);
    }

    public function scopeToken($query, $value){
        return $query->where('token', $value);
    }
}
