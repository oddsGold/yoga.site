<?php

namespace App\Http\Resources\File;

use Illuminate\Http\Resources\Json\ResourceCollection;

class FileCollection extends ResourceCollection
{
    public function toArray($request)
    {
        $this->collection->transform(function ($file) {
            return (new FileResource($file));
        });
        return parent::toArray($request);
    }
}
