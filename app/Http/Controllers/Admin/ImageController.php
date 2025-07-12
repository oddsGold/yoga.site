<?php


namespace App\Http\Controllers\Admin;

use App\Http\Requests\Admin\ImageRequest;
use App\Http\Resources\Image\ImageCollection;
use App\Http\Resources\Image\ImageResource;
use App\Services\ImageService;

class ImageController
{

    private ImageService $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function index()
    {
        return new ImageCollection($this->imageService->getAllWithPagination());
    }

    public function store(ImageRequest $request)
    {
        if($request->hasFile('data') && $request->file('data')->isValid()){
            return new ImageResource($this->imageService->save($request->file('data')));
        }
    }

    public function show($id)
    {
        return new ImageResource($this->imageService->getById($id));
    }

    public function destroy($id)
    {
        $this->imageService->delete($id);
    }
}
