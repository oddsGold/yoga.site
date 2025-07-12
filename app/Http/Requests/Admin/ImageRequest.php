<?php


namespace App\Http\Requests\Admin;


class ImageRequest extends BaseRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'data' => 'required|image',
        ];
    }
}
