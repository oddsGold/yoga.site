<?php


namespace App\Http\Requests\Admin\Main;


use App\Http\Requests\Site\BaseRequest;

class MainCreateRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description_1' => 'required|string',
            'description_2' => 'required|string',
        ];
    }
}
