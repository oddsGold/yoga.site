<?php


namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\FaqService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class FaqController extends Controller
{
    protected FaqService $faqService;

    public function __construct(FaqService $faq)
    {
        $this->faqService = $faq;
    }

    public function index()
    {
        try {
            $faqs = $this->faqService->getAll();
            return response()->json($faqs);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }

}
