<?php

namespace App\Http\Controllers\Site;

use App\Http\Requests\Site\Form\DealerRequest;
use App\Http\Resources\Form\DealerResource;
use App\Services\FormService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Site\Form\FeedbackRequest;
use App\Http\Requests\Site\Form\BuyRequest;
use App\Http\Requests\Site\Form\PresentationRequest;
use App\Http\Resources\Form\FeedbackResource;
use App\Http\Resources\Form\BuyResource;
use App\Http\Resources\Form\PresentationResource;

class FormController extends Controller
{

    protected FormService $formService;

    public function __construct(FormService $formService)
    {
        $this->formService = $formService;
    }

    public function feedback(FeedbackRequest $request)
    {
        return new FeedbackResource($this->formService->createFeedback($request->all()));
    }

    public function buy(BuyRequest $request)
    {
        return new BuyResource($this->formService->createBuy($request->all()));
    }

    public function presentation(PresentationRequest $request)
    {
        return new PresentationResource($this->formService->createPresentation($request->all()));
    }

}
