<?php

namespace App\Http\Resources\Image;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ImageCollection extends ResourceCollection
{
    public function toArray($request)
    {
        $this->collection->transform(function ($image) {
            return (new ImageResource($image));
        });
        return parent::toArray($request);
    }
}
