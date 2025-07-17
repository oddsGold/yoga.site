<?php

namespace App\Http\Resources\Main;

use App\Http\Resources\Main\MainResource;
use App\Http\Resources\SocialLinks\SocialLinksResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MainCollection extends ResourceCollection
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
            return (new MainResource($item));
        });
        return parent::toArray($request);
    }

}
