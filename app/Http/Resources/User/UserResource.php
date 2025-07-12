<?php


namespace App\Http\Resources\User;


use App\Http\Resources\BaseResource;
use App\Http\Resources\Role\RoleResource;

class UserResource extends BaseResource
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
            'login' => $this->login,
            'email' => $this->email,
            'tfa' => (bool)$this->tfa,
            'last_login_at' => (string)$this->last_login_at,
            'role' => new RoleResource($this->role),
            'created_at' => (string)date_custom_format($this->created_at),
            'updated_at' => (string)date_custom_format($this->updated_at),
        ]);
    }

}
