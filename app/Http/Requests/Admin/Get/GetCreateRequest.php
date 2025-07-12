<?php


namespace App\Http\Requests\Admin\Get;


use App\Http\Requests\Site\BaseRequest;

class GetCreateRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'description' => 'required|string',
            'published' => 'required|boolean',
            'published_at' => 'nullable|date_format:Y-m-d H:i:s',
            'published_to' => 'nullable|date_format:Y-m-d H:i:s'
        ];
    }
}
