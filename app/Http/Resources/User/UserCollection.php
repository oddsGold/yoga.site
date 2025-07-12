<?php


namespace App\Http\Resources\User;


use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    public function toArray($request)
    {
        $this->collection->transform(function ($user) {
            return (new UserResource($user));
        });
        return parent::toArray($request);
    }
}
