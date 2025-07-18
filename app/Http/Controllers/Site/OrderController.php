<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\OrderService;
use App\Services\WayForPayService;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{

    protected OrderService $orderService;

    public function __construct(OrderService $orderService, WayForPayService $wayForPayService)
    {
        $this->orderService = $orderService;
        $this->wayForPayService = $wayForPayService;
    }

    public function updateStatus(Request $request)
    {
        $validated = $request->all();

        $merchantAccount = config('services.wayforpay.merchant_account');
        if (!$merchantAccount) {
            throw new \RuntimeException('Merchant account not configured');
        }

        $signature = $this->wayForPayService->generateSignature([
            $merchantAccount,
            $validated['orderReference'],
            $validated['amount'],
            $validated['currency'],
            $validated['authCode'],
            $validated['cardPan'],
            $validated['transactionStatus'],
            $validated['reasonCode']
        ]);

        if (!hash_equals($signature, $validated['merchantSignature'])) {
            throw new \InvalidArgumentException('Invalid signature');
        }

        try {
            $order = $this->updateOrderStatus($validated);

            return response()->json([
                'success' => true,
                'order_id' => $order->id,
                'status' => $order->transaction_status
            ]);
        } catch (\Exception $e) {
            Log::error('Order update failed', [
                'reference' => $validated['orderReference'],
                'error' => $e->getMessage()
            ]);

            throw new \RuntimeException('Failed to update order status');
        }
    }

    private function updateOrderStatus(array $validated)
    {
        $dataToUpdate = [
            'transaction_status' => $validated['transactionStatus'],
            'reason' => $validated['reason'] ?? null,
            'reason_code' => $validated['reasonCode'],
            'wfp_created_date' => Carbon::createFromTimestamp($validated['createdDate'], 'UTC')
                ->setTimezone(config('app.timezone'))
                ->format('Y-m-d H:i:s'),
            'wfp_processing_date' => isset($validated['processingDate'])
                ? Carbon::createFromTimestamp($validated['processingDate'], 'UTC')
                    ->setTimezone(config('app.timezone'))
                    ->format('Y-m-d H:i:s')
                : null,
        ];

        return $this->orderService->update(
            $validated['orderReference'],
            $dataToUpdate
        );
    }
}
