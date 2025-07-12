<?php


namespace App\Services\Admin\Auth\JOSE;


use App\Exceptions\Auth\JOSE\VerificationFailedException;

class JWTParser
{

    private $header = null;
    private $payload = null;
    private $signature = null;

    public function __construct($token = null)
    {
        if(!is_null($token)){
            $this->setToken($token);
        }
    }

    public function setToken($token)
    {
        $parts = $this->parseToken($token);
        if($this->isValidStructToken($parts)){
            $header = json_decode(base64UrlDecode($parts[0]));
            $payload = json_decode(base64UrlDecode($parts[1]));

            if(isset($header->typ) && isset($header->alg) && isset($payload->exp)){
                $this->header = $parts[0];
                $this->payload = $parts[1];
                $this->signature = $parts[2];
                return;
            }
        }

        throw new VerificationFailedException();
    }

    private function parseToken($token)
    {
        return explode('.', $token);
    }

    private function isValidStructToken($parts)
    {
        return count($parts) == 3;
    }

    public function getHeader()
    {
        return $this->header;
    }

    public function getDecodedHeader()
    {
        return (array)json_decode(base64UrlDecode($this->header));
    }

    public function getPayload()
    {
        return $this->payload;
    }

    public function getDecodedPayload()
    {
        return (array)json_decode(base64UrlDecode($this->payload));
    }

    public function getSignature()
    {
        return $this->signature;
    }
}
