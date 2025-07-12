<?php

namespace App\Models;

use App\Contracts\Admin\Auth\TFAUser;
use App\Models\Admin\Auth\RefreshToken;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class User extends Model implements
    AuthenticatableContract,
    AuthorizableContract,
    CanResetPasswordContract,
    TFAUser
{
    use HasFactory,
        Notifiable,
        SoftDeletes;

    protected $fillable = [
        'role_id',
        'login',
        'email',
        'password',
        'tfa',
        'tfa_secret',
        'last_login_at',
    ];

    protected $hidden = [
        'password',
        'tfa_code'
    ];

    protected $dates = [
        'last_login_at'
    ];


    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function refreshTokens()
    {
        return $this->hasMany(RefreshToken::class);
    }

    public function isTfaEnabled()
    {
        return (bool)$this->tfa;
    }

    public function getLogin()
    {
        return $this->login;
    }

    public function setTfaSecret($secret)
    {
        $this->tfa_secret = $secret;
    }

    public function getTfaSecret()
    {
        return $this->tfa_secret;
    }

    public function getAuthIdentifierName()
    {
        return $this->getKeyName();
    }

    public function getAuthIdentifier()
    {
        return $this->{$this->getAuthIdentifierName()};
    }

    public function getAuthPassword()
    {
        return $this->password;
    }

    public function getRememberToken(){}

    public function setRememberToken($value){}

    public function getRememberTokenName(){}

    public function can($abilities, $arguments = []){}

    public function getEmailForPasswordReset(){}

    public function sendPasswordResetNotification($token){}
}
