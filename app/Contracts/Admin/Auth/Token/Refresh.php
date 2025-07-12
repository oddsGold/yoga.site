<?php


namespace App\Contracts\Admin\Auth\Token;

use Illuminate\Contracts\Auth\Authenticatable;

interface Refresh
{

    public function createToken(Authenticatable $user);

    public function regenerateToken(Authenticatable $user);

    public function isNotExpired($token);

    public function isValid($token);

    public function removeTokens(Authenticatable $user);

    public function getSubjectId($token);

    public function getTokenName();

    public function getExpirationTime();

}
