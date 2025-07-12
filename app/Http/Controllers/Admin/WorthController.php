<?php


namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Worth\WorthCreateRequest;
use App\Http\Requests\Admin\Worth\WorthUpdateRequest;
use App\Http\Resources\Worth\WorthCollection;
use App\Http\Resources\Worth\WorthResource;
use App\Services\WorthService;

class WorthController extends Controller
{
    protected WorthService $worthService;
    public function __construct(WorthService $prog)
    {
        $this->worthService = $prog;
    }


    public function index()
    {
        $this->authorize('viewAny', get_class($this->worthService->getModel()));
        return new WorthCollection($this->worthService->getAllWithPagination());
    }

    public function store(WorthCreateRequest $request)
    {
        $this->authorize('create', get_class($this->worthService->getModel()));
        return new WorthResource($this->worthService->create($request->all()));
    }

    public function edit($id)
    {
        $this->authorize('update', $this->worthService->getModel());
        return new WorthResource($this->worthService->getById($id));
    }

    public function update(WorthUpdateRequest $request, $id)
    {
        $this->authorize('update', $this->worthService->getModel());
        return new WorthResource($this->worthService->update($id, $request->all()));
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->worthService->getModel());
        $this->worthService->delete($id);
    }
}
