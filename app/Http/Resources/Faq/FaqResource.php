<?php

namespace App\Http\Resources\Faq;

use App\Http\Resources\BaseResource;
use App\Http\Resources\Image\ImageResource;

class FaqResource extends BaseResource
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
            'user' => $this->user ? $this->user->login : null,
            'published' => (bool)$this->published,
            'published_at' => (string)date_custom_format($this->published_at, 'Y-m-d H:i:s'),
            'published_to' => (string)date_custom_format($this->published_to, 'Y-m-d H:i:s'),
            'created_at' => (string)date_custom_format($this->created_at),
            'updated_at' => (string)date_custom_format($this->updated_at),
        ]);
    }
}
