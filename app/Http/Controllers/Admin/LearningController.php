<?php


namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Learning\LearningCreateRequest;
use App\Http\Requests\Admin\Learning\LearningUpdateRequest;
use App\Http\Resources\Learning\LearningCollection;
use App\Http\Resources\Learning\LearningResource;
use App\Services\LearningService;

class LearningController extends Controller
{
    protected LearningService $learningService;
    public function __construct(LearningService $item)
    {
        $this->learningService = $item;
    }


    public function index()
    {
        $this->authorize('viewAny', get_class($this->learningService->getModel()));
        return new LearningCollection($this->learningService->getAllWithPagination());
    }

    public function store(LearningCreateRequest $request)
    {
        $this->authorize('create', get_class($this->learningService->getModel()));
        return new LearningResource($this->learningService->create($request->all()));
    }

    public function edit($id)
    {
        $this->authorize('update', $this->learningService->getModel());
        return new LearningResource($this->learningService->getById($id));
    }

    public function update(LearningUpdateRequest $request, $id)
    {
        $this->authorize('update', $this->learningService->getModel());
        return new LearningResource($this->learningService->update($id, $request->all()));
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->learningService->getModel());
        $this->learningService->delete($id);
    }
}
