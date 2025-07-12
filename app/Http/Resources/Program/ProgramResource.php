<?php

namespace App\Http\Resources\Program;

use App\Http\Resources\BaseResource;
use App\Http\Resources\Image\ImageResource;

class ProgramResource extends BaseResource
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
            'description' => $this->description,
            'created_at' => (string)date_custom_format($this->created_at),
            'updated_at' => (string)date_custom_format($this->updated_at),
        ]);
    }
}
