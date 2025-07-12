<?php


namespace App\Http\Controllers\Admin;


use App\Services\Admin\Auth\UserService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\ChangePasswordRequest;
use App\Http\Requests\Admin\Auth\ChangeEmailRequest;
use App\Http\Resources\User\UserResource;

class AccountController extends Controller
{

    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        return new UserResource($this->userService->getCurrentAuthenticated());
    }

    public function password(ChangePasswordRequest $request)
    {
        $this->userService->changePasswordCurrentUser($request);
    }

    public function email(ChangeEmailRequest $request)
    {
        $this->userService->changeEmailCurrentUser($request);
    }

}
