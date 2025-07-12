<?php


namespace App\Services\Admin\Auth;


use App\Models\Resource as ResourceModel;

class ResourceService
{

    public function getAll()
    {
        return ResourceModel::all();
    }
}
