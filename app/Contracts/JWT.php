<?php

namespace App\Contracts;

use Illuminate\Contracts\Auth\Authenticatable;

interface JWT
{
    public function createToken(Authenticatable $user);

    public function isNotExpired($token);

    public function isValid($token);

    public function getSubjectId($token);
}
