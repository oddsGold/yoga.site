<?php

namespace App\Http\Resources\Role;


use App\Http\Resources\BaseResource;
use App\Http\Resources\Resource\ResourceOnlyIdCollection;
use App\Http\Resources\Resource\ResourceCollection;

class RoleResource extends BaseResource
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
            'label' => $this->label,
            'resources' => new ResourceOnlyIdCollection($this->resources),
            'created_at' => (string)date_custom_format($this->created_at),
            'updated_at' => (string)date_custom_format($this->updated_at),
        ]);
    }

}
