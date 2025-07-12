<?php


namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Get\GetCreateRequest;
use App\Http\Requests\Admin\Get\GetUpdateRequest;
use App\Http\Resources\Get\GetCollection;
use App\Http\Resources\Get\GetResource;
use App\Services\GetService;

class GetController extends Controller
{
    protected GetService $getService;
    public function __construct(GetService $item)
    {
        $this->getService = $item;
    }


    public function index()
    {
        $this->authorize('viewAny', get_class($this->getService->getModel()));
        return new GetCollection($this->getService->getAllWithPagination());
    }

    public function store(GetCreateRequest $request)
    {
        $this->authorize('create', get_class($this->getService->getModel()));
        return new GetResource($this->getService->create($request->all()));
    }

    public function edit($id)
    {
        $this->authorize('update', $this->getService->getModel());
        return new GetResource($this->getService->getById($id));
    }

    public function update(GetUpdateRequest $request, $id)
    {
        $this->authorize('update', $this->getService->getModel());
        return new GetResource($this->getService->update($id, $request->all()));
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->getService->getModel());
        $this->getService->delete($id);
    }
}
