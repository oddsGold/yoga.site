<?php


namespace App\Http\Resources\UserMemo;


use App\Http\Resources\BaseResource;

class TypeResource extends BaseResource
{
    public function toArray($request)
    {
        return $this->filtrateFields([
            'id' => $this->id,
            'title' => $this->title,
            'user' => $this->user ? $this->user->login : null,
            'created_at' => (string)date_custom_format($this->created_at),
            'updated_at' => (string)date_custom_format($this->updated_at),
        ]);
    }
}
