<?php


namespace App\Http\Requests\Site\Form;


use App\Http\Requests\Site\BaseRequest;

class FeedbackRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string|min:3|max:200',
            'phone' => 'nullable|string|min:7|max:17',
            'email' => 'required|string|min:6|max:150|email:rfc',
            'edrpou' => 'nullable|string|min:8|max:10',
            'orgName' => 'nullable|string|min:3|max:255',
            'type' => 'nullable|string',
            'accountable' => 'nullable|string',
            'question' => 'nullable|string|min:3',
        ];
    }
}
