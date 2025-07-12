<?php


namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\ResourceCollection;

class MenuCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $this->collection->transform(function ($menu) {
            return new MenuResource($menu);
        });
        return parent::toArray($request);
    }
}
