<?php


namespace App\Http\Controllers\Admin\UserMemo;


use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserMemo\TypeCreateRequest;
use App\Http\Requests\Admin\UserMemo\TypeUpdateRequest;
use App\Http\Resources\UserMemo\TypeCollection;
use App\Http\Resources\UserMemo\TypeResource;
use App\Services\UserMemo\TypeService;

class TypeController extends Controller
{
    protected TypeService $typeService;

    public function __construct(TypeService $type)
    {
        $this->typeService = $type;
    }

    public function index()
    {
        $this->authorize('viewAny', get_class($this->typeService->getModel()));
        return new TypeCollection($this->typeService->getAllWithPagination());
    }

    public function store(TypeCreateRequest $request)
    {
        $this->authorize('create', get_class($this->typeService->getModel()));
        return new TypeResource($this->typeService->create($request->all()));
    }

    public function edit($id)
    {
        $this->authorize('update', $this->typeService->getModel());
        return new TypeResource($this->typeService->getById($id));
    }

    public function update(TypeUpdateRequest $request, $id)
    {
        $this->authorize('update', $this->typeService->getModel());
        return new TypeResource($this->typeService->update($id, $request->all()));
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->typeService->getModel());
        $this->typeService->delete($id);
    }
}
