<?php


namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Main\MainCreateRequest;
use App\Http\Requests\Admin\Main\MainUpdateRequest;
use App\Http\Resources\Main\MainCollection;
use App\Http\Resources\Main\MainResource;
use App\Services\MainService;

class MainController extends Controller
{
    protected MainService $mainService;
    public function __construct(MainService $item)
    {
        $this->mainService = $item;
    }


    public function index()
    {
        $this->authorize('viewAny', get_class($this->mainService->getModel()));
        return new MainCollection($this->mainService->getAllWithPagination());
    }

    public function store(MainCreateRequest $request)
    {
        $this->authorize('create', get_class($this->mainService->getModel()));
        return new MainResource($this->mainService->create($request->all()));
    }

    public function edit($id)
    {
        $this->authorize('update', $this->mainService->getModel());
        return new MainResource($this->mainService->getById($id));
    }

    public function update(MainUpdateRequest $request, $id)
    {
        $this->authorize('update', $this->mainService->getModel());
        return new MainResource($this->mainService->update($id, $request->all()));
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->mainService->getModel());
        $this->mainService->delete($id);
    }
}
