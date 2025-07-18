<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Str;

class WayForPayService
{
    private $merchantAccount;
    private $secretKey;
    private $client;
    private $serviceUrl;

    public function __construct()
    {
        $this->merchantAccount = config('services.wayforpay.merchant_account');
        $this->secretKey = config('services.wayforpay.secret_key');
        $this->serviceUrl = config('services.wayforpay.service_url');
        $this->client = new Client();
    }

    public function generateSignature(array $data): string
    {
        $signatureString = implode(';', $data);

        return hash_hmac('md5', $signatureString, config('services.wayforpay.secret_key'));
    }
}
