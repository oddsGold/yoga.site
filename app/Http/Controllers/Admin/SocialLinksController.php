<?php


namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Http\Resources\SocialLinks\SocialLinksCollection;
use App\Http\Resources\SocialLinks\SocialLinksResource;
use App\Http\Requests\Admin\SocialLinks\SocialLinksCreateRequest;
use App\Http\Requests\Admin\SocialLinks\SocialLinksUpdateRequest;
use App\Services\SocialLinksService;
use Symfony\Component\HttpFoundation\Response;

class SocialLinksController extends Controller
{
    protected SocialLinksService $socialLinksService;
    public function __construct(SocialLinksService $links)
    {
        $this->socialLinksService = $links;
    }


    public function index()
    {
        $this->authorize('viewAny', get_class($this->socialLinksService->getModel()));
        return new SocialLinksCollection($this->socialLinksService->getAllWithPagination());
    }

    public function store(SocialLinksCreateRequest $request)
    {
        $this->authorize('create', get_class($this->socialLinksService->getModel()));
        return new SocialLinksResource($this->socialLinksService->create($request->all()));
    }

    public function edit($id)
    {
        $this->authorize('update', $this->socialLinksService->getModel());
        return new SocialLinksResource($this->socialLinksService->getById($id));
    }

    public function update(SocialLinksUpdateRequest $request, $id)
    {
        $this->authorize('update', $this->socialLinksService->getModel());
        return new SocialLinksResource($this->socialLinksService->update($id, $request->all()));
    }


    public function destroy($id)
    {
        $this->authorize('delete', $this->socialLinksService->getModel());
        $this->socialLinksService->delete($id);
    }
}
