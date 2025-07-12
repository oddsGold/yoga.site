<?php


namespace App\Http\Requests\Admin\Auth;

use App\Http\Requests\Admin\BaseRequest;

class LoginTfaRequest extends BaseRequest
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
            'code' => 'required|integer|digits:6'
        ];
    }

}
