<?php

namespace App\Http\Resources\Worth;

use App\Http\Resources\Worth\WorthResource;
use App\Http\Resources\SocialLinks\SocialLinksResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class WorthCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $this->collection->transform(function ($prog) {
            return (new WorthResource($prog));
        });
        return parent::toArray($request);
    }

}
