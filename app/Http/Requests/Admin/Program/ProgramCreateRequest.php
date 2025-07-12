<?php


namespace App\Http\Requests\Admin\Program;


use App\Http\Requests\Site\BaseRequest;

class ProgramCreateRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ];
    }
}
