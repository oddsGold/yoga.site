<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Str;

class WayForPayService
{
    private $merchantAccount;
    private $secretKey;
    private $client;

    public function __construct()
    {
        $this->merchantAccount = config('wayforpay.merchant_account');
        $this->secretKey = config('wayforpay.secret_key');
        $this->client = new Client();
    }

    public function generateSignature(array $data): string
    {
        $signatureString = implode(';', [
            $data['merchantAccount'],
            $data['orderReference'],
            $data['orderDate'],
            $data['amount'],
            $data['currency'],
            $data['productName'][0],
            $data['productCount'][0],
            $data['productPrice'][0],
        ]);

        return hash_hmac('md5', $signatureString, $this->secretKey);
    }

    public function createPayment(array $orderData): array
    {
        $defaultData = [
            'merchantAccount' => $this->merchantAccount,
            'orderReference' => Str::uuid(),
            'orderDate' => now()->timestamp,
            'currency' => 'UAH',
            'merchantSignature' => '',
        ];

        $data = array_merge($defaultData, $orderData);
        $data['merchantSignature'] = $this->generateSignature($data);

        return $data;
    }
}
