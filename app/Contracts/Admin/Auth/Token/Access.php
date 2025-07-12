<?php


namespace App\Contracts\Admin\Auth\Token;

use Illuminate\Contracts\Auth\Authenticatable;

interface Access
{

    public function createToken(Authenticatable $user, $type = '');

    public function isType($token, $type);

    public function isNotExpired($token);

    public function isValid($token);

    public function getSubjectId($token);

    public function getTokenName();

}
