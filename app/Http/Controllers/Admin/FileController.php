<?php


namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FileRequest;
use App\Http\Resources\File\FileCollection;
use App\Http\Resources\File\FileResource;
use App\Services\FileService;


class FileController extends Controller
{

    private FileService $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function index()
    {
        return new FileCollection($this->fileService->getAllWithPagination());
    }

    public function store(FileRequest $request)
    {
        if($request->hasFile('data') && $request->file('data')->isValid()){
            return new FileResource($this->fileService->save($request->file('data')));
        }
    }

    public function show($id)
    {
        return new FileResource($this->fileService->getById($id));
    }

    public function destroy($id)
    {
        $this->fileService->delete($id);
    }


}
