<?php


namespace App\Http\Requests\Site\Order;


use App\Http\Requests\Site\BaseRequest;

class OrderCreateRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string|min:3|max:200',
            'phone' => 'required|string|min:7|max:17',
            'email' => 'required|string|min:6|max:150|email:rfc',
        ];
    }
}
