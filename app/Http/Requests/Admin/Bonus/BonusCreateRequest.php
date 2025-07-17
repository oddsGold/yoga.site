<?php


namespace App\Http\Requests\Admin\Bonus;


use App\Http\Requests\Site\BaseRequest;

class BonusCreateRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ];
    }
}
