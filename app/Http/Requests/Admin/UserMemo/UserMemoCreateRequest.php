<?php


namespace App\Http\Requests\Admin\UserMemo;


use App\Http\Requests\Admin\BaseRequest;

class UserMemoCreateRequest extends BaseRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'type' => 'required|integer',
            'file' => 'required',
            'file.id' => 'required|integer',
            'file.name' => 'required|string',
            'file.path' => 'required|string',
            'file.url' => 'nullable|string',
        ];
    }

}
