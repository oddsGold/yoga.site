<?php


namespace App\Http\Resources\Video;


use App\Http\Resources\BaseResource;
use App\Http\Resources\Image\ImageResource;

class VideoResource extends BaseResource
{
    public function toArray($request)
    {
        return $this->filtrateFields([
            'id' => $this->id,
            'title' => $this->title,
            'url' => $this->url,
            'user' => $this->user ? $this->user->login : null,
            'desktop_preview' => $this->desktopPreview
                ? (new ImageResource($this->desktopPreview))->only(['id', 'url', 'origin', 'name', 'path', 'created_at'])
                : null,
            'tablet_preview' => $this->tabletPreview
                ? (new ImageResource($this->tabletPreview))->only(['id', 'url', 'origin', 'name', 'path', 'created_at'])
                : null,
            'mobile_preview' => $this->mobilePreview
                ? (new ImageResource($this->mobilePreview))->only(['id', 'url', 'origin', 'name', 'path', 'created_at'])
                : null,
            'created_at' => (string)date_custom_format($this->created_at),
            'updated_at' => (string)date_custom_format($this->updated_at),
        ]);
    }
}
