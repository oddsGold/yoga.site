<?php


namespace App\Http\Response\Admin\Auth;


class RefreshResponse extends AuthResponse
{

    public function __construct()
    {
        parent::__construct([], 200);
    }
}
