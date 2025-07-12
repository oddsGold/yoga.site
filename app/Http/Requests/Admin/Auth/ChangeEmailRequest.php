<?php

namespace App\Http\Requests\Admin\Auth;

use App\Http\Requests\Admin\BaseRequest;

class ChangeEmailRequest extends BaseRequest
{

    public function rules()
    {
        return [
            'email' => 'required|email:rfc,dns'
        ];
    }
}
