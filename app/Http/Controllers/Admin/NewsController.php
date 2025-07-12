<?php


namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\News\NewsCreateRequest;
use App\Http\Requests\Admin\News\NewsUpdateRequest;
use App\Http\Resources\News\NewsCollection;
use App\Http\Resources\News\NewsResource;
use App\Services\NewsService;
use Illuminate\Http\Request;

class NewsController extends Controller
{

    protected NewsService $newsService;

    public function __construct(NewsService $newsService)
    {
        $this->newsService = $newsService;
    }

    public function index()
    {
        $this->authorize('viewAny', get_class($this->newsService->getModel()));
        return new NewsCollection($this->newsService->getAllWithPagination());
    }

    public function store(NewsCreateRequest $request)
    {
        $this->authorize('create', get_class($this->newsService->getModel()));
        return new NewsResource($this->newsService->create($request->all()));
    }

    public function edit($id)
    {
        $this->authorize('update', $this->newsService->getModel());
        return new NewsResource($this->newsService->getById($id));
    }

    public function update(NewsUpdateRequest $request, $id)
    {
        $this->authorize('update', $this->newsService->getModel());
        return new NewsResource($this->newsService->update($id, $request->all()));
    }

    public function destroy(Request $request, $id)
    {
        $this->authorize('delete', $this->newsService->getModel());
        $this->newsService->delete($id);
    }


}
