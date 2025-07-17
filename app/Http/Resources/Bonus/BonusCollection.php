<?php

namespace App\Http\Resources\Bonus;

use App\Http\Resources\Bonus\BonusResource;
use App\Http\Resources\SocialLinks\SocialLinksResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BonusCollection extends ResourceCollection
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
            return (new BonusResource($item));
        });
        return parent::toArray($request);
    }

}
