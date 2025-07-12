<?php


namespace App\Http\Resources\Image;


use App\Http\Resources\BaseResource;

class ImageResource extends BaseResource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->filtrateFields([
            'id' => $this->id,
            'name' => $this->name,
            'origin' => $this->origin,
            'path' => $this->path,
            'size' => $this->size,
            'type' => $this->type,
            'user' => $this->user ? $this->user->login : null,
            'url' => asset($this->getPathAndName()),
            'created_at' => $this->created_at->format("d.m.Y H:i"),
            'updated_at' => $this->updated_at->format("d.m.Y H:i"),
        ]);
    }
}
