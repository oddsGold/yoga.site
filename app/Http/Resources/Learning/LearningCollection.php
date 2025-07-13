<?php

namespace App\Http\Resources\Learning;

use App\Http\Resources\Learning\LearningResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class LearningCollection extends ResourceCollection
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
            return (new LearningResource($item));
        });
        return parent::toArray($request);
    }

}
