<?php

namespace App\Http\Requests\Admin\Auth;

use App\Http\Requests\Admin\BaseRequest;

class LoginRequest extends BaseRequest
{


    public function authorize()
    {
        return true;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'login' => 'required|min:3|max:255',
            'password' => 'required|min:3|max:255'
        ];
    }
}
