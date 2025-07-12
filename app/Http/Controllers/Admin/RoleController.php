<?php


namespace App\Http\Controllers\Admin;

use App\Services\Admin\Auth\RoleService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Role\RoleCreateRequest;
use App\Http\Requests\Admin\Role\RoleUpdateRequest;
use App\Http\Resources\Role\RoleCollection;
use App\Http\Resources\Role\RoleResource;

class RoleController extends Controller
{
    protected RoleService $roleService;

    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }

    public function index()
    {
        $this->authorize('viewAny', get_class($this->roleService->getModel()));
        return new RoleCollection($this->roleService->getAllWithPagination());
    }

    public function store(RoleCreateRequest $request)
    {
        $this->authorize('create', get_class($this->roleService->getModel()));
        return new RoleResource($this->roleService->create($request->all()));
    }

    public function edit($id)
    {
        $this->authorize('update', $this->roleService->getModel());
        return new RoleResource($this->roleService->getById($id));
    }

    public function update(RoleUpdateRequest $request, $id)
    {
        $this->authorize('update', $this->roleService->getModel());
        return new RoleResource($this->roleService->update($id, $request->all()));
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->roleService->getModel());
        $this->roleService->delete($id);
    }

}
