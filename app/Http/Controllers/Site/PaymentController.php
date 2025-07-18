<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\WayForPayService;
use Illuminate\Http\Request;
use App\Services\ProductService;
use App\Services\OrderService;
use App\Http\Resources\Order\OrderResource;
use App\Http\Requests\Site\Order\OrderCreateRequest;
use App\Http\Requests\Site\Order\OrderUpdateRequest;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{

    protected WayForPayService $wayForPayService;
    protected OrderService $orderService;

    public function __construct(WayForPayService $wayForPayService, OrderService $orderService)
    {
        $this->wayForPayService = $wayForPayService;
        $this->orderService = $orderService;
    }


    public function createPayment(Request $request, ProductService $productService)
    {
        $product = $productService->findProduct($request->id);

        if (!$product) {
            return response()->json(['error' => 'Продукт не знайдено'], 404);
        }

        $wayForPay = new WayForPayService();

        $paymentData = $wayForPay->createPayment([
            'amount' => $product->price * 100,
            'productName' => [$product->name],
            'productCount' => [1],
            'productPrice' => [$product->price * 100],
        ]);

        $paymentUrl = $paymentData['paymentUrl'] ?? config('wayforpay.service_url');

        if ($paymentUrl) {
            return response()->json([
                'paymentUrl' => $paymentUrl,
                'formData' => $paymentData['formData']
            ]);
        } else {
            return response()->json(['error' => 'Не вдалося отримати URL для оплати'], 500);
        }
    }


    public function generateSignature(OrderCreateRequest $request, ProductService $productService)
    {
        $merchantAccount = config('services.wayforpay.merchant_account');

        $product = $productService->getLatestProduct();

        if (!$product) {
            return response()->json(['error' => 'Продукт не знайдено'], 404);
        }

        try {
            $orderData = array_merge($request->all(), [
                'product_id' => $product->id,
                'amount' => $product->price
            ]);

            $order = new OrderResource($this->orderService->create($orderData));

            if (!$order) {
                throw new \RuntimeException('Failed to create order');
            }
        } catch (\Exception $e) {
            Log::error('Order creation failed: ' . $e->getMessage());
            return response()->json(['error' => 'Сталася помилка при створенні замовлення'], 500);
        }


        $amount = (float)$product->price;
        $orderReference = $order->id;
        $orderDate = $order->created_at->getTimestamp();
        $currency = $product->currency;
        $productCounts = 1;

        $signature = $this->wayForPayService->generateSignature([
            $merchantAccount,
            request()->getHost(),
            $orderReference,
            $orderDate,
            $amount,
            $currency,
            $product->name,
            $productCounts,
            $product->price,
        ]);

        return response()->json([
            'signature' => $signature,
            'merchantDomainName' => request()->getHost(),
            'orderReference' => $orderReference,
            'orderDate' => $orderDate,
            'merchantAccount' => $merchantAccount,
            'amount' => $amount,
            'currency' => $currency,
            'productNames' => $product->name,
            'productCounts' => $productCounts,
            'productPrices' => $product->price,
        ]);
    }
}
