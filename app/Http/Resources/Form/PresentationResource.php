<?php


namespace App\Http\Resources\Form;


use App\Http\Resources\BaseResource;

class PresentationResource extends BaseResource
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
            'nickname' => $this->nickname,
            'phone' => $this->phone,
            'email' => $this->email,
            'created_at' => (string)date_custom_format($this->created_at),
        ]);
    }
}
