<?php


namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Program\ProgramCreateRequest;
use App\Http\Requests\Admin\Program\ProgramUpdateRequest;
use App\Http\Resources\Program\ProgramCollection;
use App\Http\Resources\Program\ProgramResource;
use App\Services\ProgramService;

class ProgramController extends Controller
{
    protected ProgramService $programService;
    public function __construct(ProgramService $prog)
    {
        $this->programService = $prog;
    }


    public function index()
    {
        $this->authorize('viewAny', get_class($this->programService->getModel()));
        return new ProgramCollection($this->programService->getAllWithPagination());
    }

    public function store(ProgramCreateRequest $request)
    {
        $this->authorize('create', get_class($this->programService->getModel()));
        return new ProgramResource($this->programService->create($request->all()));
    }

    public function edit($id)
    {
        $this->authorize('update', $this->programService->getModel());
        return new ProgramResource($this->programService->getById($id));
    }

    public function update(ProgramUpdateRequest $request, $id)
    {
        $this->authorize('update', $this->programService->getModel());
        return new ProgramResource($this->programService->update($id, $request->all()));
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->programService->getModel());
        $this->programService->delete($id);
    }
}
