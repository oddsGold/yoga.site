<?php


namespace App\Http\Response\Admin\Auth;


class ForgotTFAResponse extends AuthResponse
{

    public function __construct($code = 201)
    {
        parent::__construct([], $code);
    }
}
