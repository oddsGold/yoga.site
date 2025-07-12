<?php

namespace App\Http\Resources\SocialLinks;

use App\Http\Resources\SocialLinks\SocialLinksResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SocialLinksCollection extends ResourceCollection
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
            return (new SocialLinksResource($faq))->except(['description']);
        });
        return parent::toArray($request);
    }

}
