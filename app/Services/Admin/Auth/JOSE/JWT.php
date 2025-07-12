<?php


namespace App\Services\Admin\Auth\JOSE;

use App\Services\Admin\Auth\JOSE\JWS;

class JWT
{

    private $header = [];
    private $payload = [];
    private $separator = '.';
    private $alg;
    private $exp;


    public function __construct($exp = 1800, $alg = 'HS256')
    {
        $this->exp = $exp;
        $this->alg = $alg;
        $this->header = $this->createDefaultHeader();
        $this->payload = $this->createDefaultPayload();
    }

    public function setExpirationTime($expirationTime)
    {
        $this->payload['exp'] = time() + $expirationTime;
    }

    public function setAlgorithm($alg)
    {
        $this->header['alg'] = $alg;
    }

    private function createDefaultHeader()
    {
        return [
            'typ' => 'JWT',
            'alg' => $this->alg
        ];
    }

    private function createDefaultPayload()
    {
        return [
            'exp' => time() + $this->exp,
        ];
    }

    public function getExpirationTimeout()
    {
        return $this->payload['exp'];
    }

    public function setHeader($header)
    {
        $this->header = $header;
    }

    public function setPayload($payload)
    {
        $this->payload = $payload;
    }

    public function addToPayload($data)
    {
        $this->payload = array_merge($this->payload, $data);
    }

    private function getEncodedHeader()
    {
        return base64UrlEncode(json_encode($this->header));
    }

    private function getEncodedPayload()
    {
        return base64UrlEncode(json_encode($this->payload));
    }

    public function getSignature()
    {
        return base64UrlEncode(
            (string)(new JWS(
                $this->getEncodedHeader() . $this->separator . $this->getEncodedPayload(),
                $this->alg
            ))
        );
    }

    private function createToken()
    {
        return $this->getEncodedHeader() . $this->separator . $this->getEncodedPayload() . $this->separator . $this->getSignature();
    }

    public function getToken()
    {
        return $this->createToken();
    }


    public function __toString()
    {
        return $this->getToken();
    }

}
