<?php

namespace App\Http\Resources\Main;

use App\Http\Resources\BaseResource;
use App\Http\Resources\Image\ImageResource;

class MainResource extends BaseResource
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
            'title' => $this->title,
            'description_1' => $this->description_1,
            'description_2' => $this->description_2,
            'created_at' => (string)date_custom_format($this->created_at),
            'updated_at' => (string)date_custom_format($this->updated_at),
        ]);
    }
}
