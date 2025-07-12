<?php


namespace App\Http\Resources\Admin;


use App\Http\Resources\BaseResource;

class MenuResource extends BaseResource
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
            'urn' => $this->urn,
            'material_icon' => $this->material_icon,
            $this->mergeWhen($this->submenu->count() > 0, [
                'submenu' => new MenuCollection($this->submenu),
            ]),
        ]);
    }
}
