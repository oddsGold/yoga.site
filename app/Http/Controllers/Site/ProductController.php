<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{

    protected ProductService $productService;

    public function __construct(ProductService $product)
    {
        $this->productService = $product;
    }

    public function getProductData(Request $request)
    {
        try {
            $product = $this->productService->getLatestProduct();
            return response()->json($product);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }
}
