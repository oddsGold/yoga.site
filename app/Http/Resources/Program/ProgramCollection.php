<?php

namespace App\Http\Resources\Program;

use App\Http\Resources\SocialLinks\SocialLinksResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProgramCollection extends ResourceCollection
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
            return (new ProgramResource($prog));
        });
        return parent::toArray($request);
    }

}
