<?php


namespace App\Http\Controllers\Admin;


use App\Services\Admin\Auth\UserService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\UserCreateRequest;
use App\Http\Requests\Admin\User\UserUpdateRequest;
use App\Http\Resources\User\UserCollection;
use App\Http\Resources\User\UserResource;

class UserController extends Controller
{

    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        $this->authorize('viewAny', get_class($this->userService->getModel()));
        return new UserCollection($this->userService->getAllWithPagination());
    }

    public function store(UserCreateRequest $request)
    {
        $this->authorize('create', get_class($this->userService->getModel()));
        return new UserResource($this->userService->create($request->all()));
    }

    public function edit($id)
    {
        $this->authorize('update', $this->userService->getModel());
        return new UserResource($this->userService->getById($id));
    }

    public function update(UserUpdateRequest $request, $id)
    {
        $this->authorize('update', $this->userService->getModel());
        return new UserResource($this->userService->update($id, $request->all()));
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->userService->getModel());
        $this->userService->delete($id);
    }

}
