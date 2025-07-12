<?php


namespace App\Http\Controllers\Admin\UserMemo;


use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserMemo\UserMemoCreateRequest;
use App\Http\Requests\Admin\UserMemo\UserMemoUpdateRequest;
use App\Http\Resources\UserMemo\UserMemoCollection;
use App\Http\Resources\UserMemo\UserMemoResource;
use App\Services\UserMemo\UserMemoService;

class UserMemoController extends Controller
{
    protected UserMemoService $userMemoService;

    public function __construct(UserMemoService $userMemo)
    {
        $this->userMemoService = $userMemo;
    }

    public function index()
    {
        $this->authorize('viewAny', get_class($this->userMemoService->getModel()));
        return new UserMemoCollection($this->userMemoService->getAllWithPagination());
    }

    public function store(UserMemoCreateRequest $request)
    {
        $this->authorize('create', get_class($this->userMemoService->getModel()));
        return new UserMemoResource($this->userMemoService->create($request->all()));
    }

    public function edit($id)
    {
        $this->authorize('update', $this->userMemoService->getModel());
        return new UserMemoResource($this->userMemoService->getById($id));
    }

    public function update(UserMemoUpdateRequest $request, $id)
    {
        $this->authorize('update', $this->userMemoService->getModel());
        return new UserMemoResource($this->userMemoService->update($id, $request->all()));
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->userMemoService->getModel());
        $this->userMemoService->delete($id);
    }
}
