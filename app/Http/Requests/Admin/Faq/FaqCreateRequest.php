<?php


namespace App\Http\Requests\Admin\Faq;


use App\Http\Requests\Site\BaseRequest;

class FaqCreateRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'title' => 'required|string|min:3|max:255',
            'description' => 'nullable|string|min:50',
            'published' => 'required|boolean',
            'published_at' => 'nullable|date_format:Y-m-d H:i:s',
            'published_to' => 'nullable|date_format:Y-m-d H:i:s'
        ];
    }
}
