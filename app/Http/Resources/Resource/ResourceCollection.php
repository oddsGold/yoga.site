<?php


namespace App\Http\Resources\Resource;



class ResourceCollection extends \Illuminate\Http\Resources\Json\ResourceCollection
{
    public function toArray($request)
    {
        $this->collection->transform(function ($resource) {
            return (new ResourceResource($resource));
        });
        return parent::toArray($request);
    }
}
