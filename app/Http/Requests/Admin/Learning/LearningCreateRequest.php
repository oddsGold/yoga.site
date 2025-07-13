<?php


namespace App\Http\Requests\Admin\Learning;


use App\Http\Requests\Site\BaseRequest;

class LearningCreateRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'published' => 'required|boolean',
        ];
    }
}
