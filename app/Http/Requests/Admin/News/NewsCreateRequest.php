<?php


namespace App\Http\Requests\Admin\News;


use App\Http\Requests\Admin\BaseRequest;

class NewsCreateRequest extends BaseRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|min:3|max:255',
            'url' => 'required|string|max:255',
            'description' => 'nullable|string|max:400',
            'published' => 'required|boolean',
            'published_at' => 'nullable|date_format:Y-m-d H:i:s',
            'published_to' => 'nullable|date_format:Y-m-d H:i:s'
        ];
    }

}
