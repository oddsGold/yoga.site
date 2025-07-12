<?php

namespace App\Http\Resources\UserMemo;

use Illuminate\Http\Resources\Json\ResourceCollection;

class UserMemoCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $this->collection->transform(function ($userMemo) {
            return new UserMemoResourceWithType($userMemo);
        });
        return parent::toArray($request);
    }
}
