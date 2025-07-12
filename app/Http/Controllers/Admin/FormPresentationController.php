<?php


namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Http\Resources\Form\PresentationCollection;
use App\Services\FormPresentationService;
use Symfony\Component\HttpFoundation\Response;

class FormPresentationController extends Controller
{
    protected FormPresentationService $formPresentationService;
    public function __construct(FormPresentationService $form)
    {
        $this->formPresentationService = $form;
    }


    public function index()
    {
        $this->authorize('viewAny', get_class($this->formPresentationService->getModel()));
        return new PresentationCollection($this->formPresentationService->getAllWithPagination());
    }


    public function destroy($id)
    {
        $this->authorize('delete', $this->formPresentationService->getModel());
        $this->formPresentationService->delete($id);
    }
}
