<?php


namespace App\Http\Requests\Admin\Role;


use App\Http\Requests\Admin\BaseRequest;

class RoleCreateRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'label' => 'required|string|min:3|max:255',
            'resources' => 'required|array',
            'resources.*' => 'required|integer',
        ];
    }
}
