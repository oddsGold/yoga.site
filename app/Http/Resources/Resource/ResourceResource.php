<?php


namespace App\Http\Resources\Resource;


use App\Http\Resources\BaseResource;

class ResourceResource extends BaseResource
{
    public function toArray($request)
    {
        return $this->filtrateFields([
            'id' => $this->id,
            'name' => $this->name,
            'label' => $this->label,
            'created_at' => (string)date_custom_format($this->created_at),
            'updated_at' => (string)date_custom_format($this->updated_at),
        ]);
    }
}
