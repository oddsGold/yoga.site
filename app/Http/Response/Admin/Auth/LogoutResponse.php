<?php


namespace App\Http\Response\Admin\Auth;


class LogoutResponse extends AuthResponse
{

    public function __construct()
    {
        parent::__construct([], 204);
    }
}
