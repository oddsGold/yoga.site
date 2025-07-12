<?php

namespace App\Http\Resources\SocialLinks;

use App\Http\Resources\BaseResource;
use App\Http\Resources\Image\ImageResource;

class SocialLinksResource extends BaseResource
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
            'facebook' => $this->facebook,
            'instagram' => $this->instagram,
            'tik_tok' => $this->tik_tok,
            'you_tube' => $this->you_tube,
            'telegram' => $this->telegram,
        ]);
    }
}
