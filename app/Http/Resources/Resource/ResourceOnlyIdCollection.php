<?php


namespace App\Http\Resources\Resource;


use Illuminate\Http\Resources\Json\ResourceCollection;

class ResourceOnlyIdCollection extends ResourceCollection
{

    public function toArray($request)
    {
        return $this->collection->transform(function ($resource) {
            return $resource->id;
        })->unique()->values()->toArray();
    }
}
