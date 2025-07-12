<?php

namespace App\Http\Resources\Form;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PresentationCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $this->collection->transform(function ($form) {
            return (new PresentationResource($form))->except(['description']);
        });
        return parent::toArray($request);
    }

}
