<?php


namespace App\Http\Controllers\Site;


use App\Http\Controllers\Controller;
use App\Services\UserMemo\UserMemoService;

class UserMemoController extends Controller
{

    protected UserMemoService $userMemoService;

    public function __construct(UserMemoService $userMemoType)
    {
        $this->userMemoService = $userMemoType;
    }

    public function download($id)
    {
        $file = $this->userMemoService->getFileById($id);
        return response()->download(public_path($file->getPathAndName()), $file->origin);
    }
}
