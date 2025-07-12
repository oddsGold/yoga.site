<?php


namespace App\Http\Requests\Admin\SocialLinks;


use App\Http\Requests\Site\BaseRequest;

class SocialLinksCreateRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'facebook' => 'max:500',
            'instagram' => 'max:500',
            'tik_tok' => 'max:500',
            'you_tube' => 'max:500',
            'telegram' => 'max:500',
        ];
    }
}
