<?php


namespace App\Http\Requests\Admin\Auth;


use App\Http\Requests\Admin\BaseRequest;

class ChangePasswordRequest extends BaseRequest
{

    public function rules()
    {
        return [
            'old_password' => 'required|min:3',
            'password' => 'required|min:3|confirmed',
        ];
    }
}
