<?php


namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Faq\FaqCreateRequest;
use App\Http\Requests\Admin\Faq\FaqUpdateRequest;
use App\Http\Resources\Faq\FaqCollection;
use App\Http\Resources\Faq\FaqResource;
use App\Services\FaqService;
use Symfony\Component\HttpFoundation\Response;

class FaqController extends Controller
{
    protected FaqService $faqService;
    public function __construct(FaqService $faq)
    {
        $this->faqService = $faq;
    }

//    public function index()
//    {
//        return response()->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
//    }

    public function index()
    {
        $this->authorize('viewAny', get_class($this->faqService->getModel()));
        return new FaqCollection($this->faqService->getAllWithPagination());
    }

    public function store(FaqCreateRequest $request)
    {
        $this->authorize('create', get_class($this->faqService->getModel()));
        return new FaqResource($this->faqService->create($request->all()));
    }

    public function edit($id)
    {
        $this->authorize('update', $this->faqService->getModel());
        return new FaqResource($this->faqService->getById($id));
    }

    public function update(FaqUpdateRequest $request, $id)
    {
        $this->authorize('update', $this->faqService->getModel());
        return new FaqResource($this->faqService->update($id, $request->all()));
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->faqService->getModel());
        $this->faqService->delete($id);
    }
}
