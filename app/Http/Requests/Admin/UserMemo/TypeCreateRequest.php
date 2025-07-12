<?php


namespace App\Http\Requests\Admin\UserMemo;


use App\Http\Requests\Site\BaseRequest;

class TypeCreateRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'title' => 'required|string|min:3|max:255',
        ];
    }
}
