<?php


namespace App\Http\Controllers\Admin;


use App\Services\Admin\Auth\ResourceService;
use App\Http\Controllers\Controller;
use App\Http\Resources\Resource\ResourceCollection;

class ResourceController extends Controller
{

    protected ResourceService $resourceService;

    public function __construct(ResourceService $resourceService)
    {
        $this->resourceService = $resourceService;
    }

    public function index()
    {
        return new ResourceCollection($this->resourceService->getAll());
    }
}
