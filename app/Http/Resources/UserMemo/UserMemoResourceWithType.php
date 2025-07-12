<?php


namespace App\Http\Resources\UserMemo;


use App\Http\Resources\BaseResource;
use App\Http\Resources\File\FileResource;

class UserMemoResourceWithType extends BaseResource
{
    public function toArray($request)
    {
        return $this->filtrateFields([
            'id' => $this->id,
            'type' => $this->type->title,
            'user' => $this->user ? $this->user->login : null,
            'file' => (new FileResource($this->file))->only(['id', 'url', 'name', 'path', 'origin', 'created_at']),
            'created_at' => (string)date_custom_format($this->created_at),
            'updated_at' => (string)date_custom_format($this->updated_at),
        ]);
    }
}
