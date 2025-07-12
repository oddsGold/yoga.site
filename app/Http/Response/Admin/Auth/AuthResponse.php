<?php


namespace App\Http\Response\Admin\Auth;

use App\Http\Response\Admin\BaseResponse;

class AuthResponse extends BaseResponse
{

    public function __construct($data = [], $status = 401, $headers = [])
    {
        parent::__construct($data, $status , $headers);
    }

    public function withAccessToken($name, $token)
    {
        $this->data[$name] = $token;
        return $this;
    }

    public function withRefreshToken($name, $token, $exp)
    {
       $this->response->cookie(
            $name,
            $token,
            $exp,
            route('api.admin.auth.refresh', [], false),
            request()->getHost(),
            false,
            true
        );
        return $this;
    }
}
