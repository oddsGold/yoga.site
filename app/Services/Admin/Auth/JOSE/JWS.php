<?php


namespace App\Services\Admin\Auth\JOSE;


use App\Exceptions\Auth\JOSE\UnexpectedAlgorithmException;

class JWS
{

    private $currentAlgorithm;
    private $data;


    public function __construct($data, $algorithm = null)
    {
        $this->data = $data;
        $this->currentAlgorithm = $algorithm;
    }

    private function getAlgorithm($alg)
    {
        switch ($alg) {
            case 'HS256':
                return 'sha256';
            case 'HS384':
                return 'sha384';
            case 'HS512':
                return 'sha512';
            default:
                throw new UnexpectedAlgorithmException();

        }
    }

    public function getSignature()
    {
        return hash_hmac(
            $this->getAlgorithm($this->currentAlgorithm),
            $this->data,
            $this->getSecretKey(),
            true
        );
    }

    private function getSecretKey()
    {
        return config('auth.key');
    }

    public function __toString()
    {
        return $this->getSignature();
    }

}
