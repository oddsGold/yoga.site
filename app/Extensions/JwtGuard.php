<?php


namespace App\Extensions;

use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Http\Request;
use App\Contracts\Admin\Auth\Token\Refresh;
use App\Contracts\Admin\Auth\Token\Access;
use Illuminate\Auth\GuardHelpers;
use Illuminate\Support\Str;

class JwtGuard implements Guard
{
    use GuardHelpers;

    private $request;
    protected $accessTokenService;
    protected $refreshTokenService;
    protected $currentRequestType;

    const BASE_TYPE = 'base';
    const LOGIN_TYPE = 'login';
    const REFRESH_TYPE = 'refresh';

    public function __construct(
        UserProvider $provider, Request $request , Access $accessTokenService, Refresh $refreshTokenService, $type = self::LOGIN_TYPE
    ){
        $this->provider = $provider;
        $this->request = $request;
        $this->user = null;
        $this->accessTokenService = $accessTokenService;
        $this->refreshTokenService = $refreshTokenService;
        $this->currentRequestType = $type;

    }

    public function user()
    {
        if (! is_null($this->user)) {
            return $this->user;
        }


        if($accessToken = $this->getAccessTokenForRequest()){
            if(
                $this->accessTokenService->isValid($accessToken) &&
                $this->accessTokenService->isNotExpired($accessToken) &&
                $this->accessTokenService->isType($accessToken, $this->currentRequestType)
            ){
                if($id = $this->accessTokenService->getSubjectId($accessToken)){

                    $user = $this->provider->retrieveById($id);

                    if(!is_null($user)){
                        $this->setUser($user);
                        return true;
                    }
                }

            }
        }

        if($refreshToken = $this->getRefreshTokenForRequest()){
            if(
                $this->refreshTokenService->isNotExpired($refreshToken) &&
                $this->refreshTokenService->isValid($refreshToken) &&
                $this->currentRequestType == $this->getRefreshType()
            ){
                if($id = $this->refreshTokenService->getSubjectId($refreshToken)){
                    $user = $this->provider->retrieveById($id);
                    if(!is_null($user)){
                        $this->setUser($user);
                        return true;
                    }
                }
            }
        }


    }

    private function getRefreshTokenForRequest()
    {
        return $this->request->cookie($this->refreshTokenService->getTokenName());
    }

    private function getAccessTokenForRequest()
    {
        return $this->request->bearerToken();
    }

    public function validate(array $credentials = [])
    {
        if(isset($credentials['login']) && isset($credentials['password'])){
            $user = $this->provider->retrieveByCredentials($credentials);
            if (!is_null($user) && $this->provider->validateCredentials($user, $credentials)) {
                $this->setUser($user);
                return true;
            }
        }
        return false;
    }

    public static function parseType($name)
    {
        return Str::after($name, '/');
    }

    public function getLoginType()
    {
        return self::LOGIN_TYPE;
    }

    public function getBaseType()
    {
        return self::BASE_TYPE;
    }

    public function getRefreshType()
    {
        return self::REFRESH_TYPE;
    }



}
