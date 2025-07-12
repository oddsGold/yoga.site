<?php


namespace App\Http\Resources\Role;


use Illuminate\Http\Resources\Json\ResourceCollection;

class RoleCollection extends ResourceCollection
{
    public function toArray($request)
    {
        $this->collection->transform(function ($role) {
            return (new RoleResource($role));
        });
        return parent::toArray($request);
    }
}
