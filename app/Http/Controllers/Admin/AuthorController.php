<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Author\AuthorCreateRequest;
use App\Http\Requests\Admin\Author\AuthorUpdateRequest;
use App\Http\Resources\Author\AuthorCollection;
use App\Http\Resources\Author\AuthorResource;
use App\Services\AuthorService;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    protected AuthorService $authorService;

    public function __construct(AuthorService $item)
    {
        $this->authorService = $item;
    }

    public function index()
    {
        $this->authorize('viewAny', get_class($this->authorService->getModel()));
        return new AuthorCollection($this->authorService->getAllWithPagination());
    }

    public function store(AuthorCreateRequest $request)
    {
        $this->authorize('create', get_class($this->authorService->getModel()));
        return new AuthorResource($this->authorService->create($request->all()));
    }

    public function edit($id)
    {
        $this->authorize('update', $this->authorService->getModel());
        return new AuthorResource($this->authorService->getById($id));
    }

    public function update(AuthorUpdateRequest $request, $id)
    {
        $this->authorize('update', $this->authorService->getModel());
        return new AuthorResource($this->authorService->update($id, $request->all()));
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->authorService->getModel());
        $this->authorService->delete($id);
    }
}
