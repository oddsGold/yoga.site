<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Video\VideoCreateRequest;
use App\Http\Requests\Admin\Video\VideoUpdateRequest;
use App\Http\Resources\Video\VideoCollection;
use App\Http\Resources\Video\VideoResource;
use App\Services\VideoService;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    protected VideoService $videoService;

    public function __construct(VideoService $video)
    {
        $this->videoService = $video;
    }

    public function index()
    {
        $this->authorize('viewAny', get_class($this->videoService->getModel()));
        return new VideoCollection($this->videoService->getAllWithPagination());
    }

    public function store(VideoCreateRequest $request)
    {
        $this->authorize('create', get_class($this->videoService->getModel()));
        return new VideoResource($this->videoService->create($request->all()));
    }

    public function edit($id)
    {
        $this->authorize('update', $this->videoService->getModel());
        return new VideoResource($this->videoService->getById($id));
    }

    public function update(VideoUpdateRequest $request, $id)
    {
        $this->authorize('update', $this->videoService->getModel());
        return new VideoResource($this->videoService->update($id, $request->all()));
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->videoService->getModel());
        $this->videoService->delete($id);
    }
}
