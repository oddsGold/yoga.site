<?php


namespace App\Http\Requests\Admin\User;


use App\Http\Requests\Admin\BaseRequest;

class UserCreateRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'login' => 'required|string|min:4|max:255',
            'email' => 'required|string|min:6|max:150|email:rfc',
            'role' => 'required|integer',
            'tfa' => 'required|boolean',
            'password' => 'nullable|min:8|confirmed',
        ];
    }
}
