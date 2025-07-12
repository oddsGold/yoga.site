<?php

namespace App\Http\Resources\Faq;

use Illuminate\Http\Resources\Json\ResourceCollection;

class FaqCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $this->collection->transform(function ($faq) {
            return (new FaqResource($faq))->except(['description']);
        });
        return parent::toArray($request);
    }

}
