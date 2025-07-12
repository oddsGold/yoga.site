<?php

namespace App\Http\Resources\Get;

use App\Http\Resources\Get\GetResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class GetCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $this->collection->transform(function ($item) {
            return (new GetResource($item));
        });
        return parent::toArray($request);
    }

}
