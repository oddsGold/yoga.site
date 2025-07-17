<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\WayForPayService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function showPaymentForm()
    {
        return view('payment.form');
    }

    public function createPayment(Request $request)
    {
        // Отримуємо дані товару з БД (приклад)
        $product = \App\Models\Product::find($request->product_id);

        $wayForPay = new WayForPayService();

        $paymentData = $wayForPay->createPayment([
            'amount' => $product->price,
            'productName' => [$product->name],
            'productCount' => [1],
            'productPrice' => [$product->price],
        ]);

        return response()->json([
            'paymentUrl' => config('services.wayforpay.service_url'),
            'formData' => $paymentData
        ]);
    }

    public function processPayment(Request $request, WayForPayService $wayForPay)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric',
            'product_name' => 'required|string',
        ]);

        $paymentData = $wayForPay->createPayment([
            'amount' => $validated['amount'],
            'productName' => [$validated['product_name']],
            'productCount' => [1],
            'productPrice' => [$validated['amount']],
        ]);

        return view('payment.redirect', compact('paymentData'));
    }

    public function handleCallback(Request $request)
    {
        // Обробка колбеку від WayForPay
        logger()->info('WayForPay callback:', $request->all());

        return response()->json(['status' => 'success']);
    }
}
