<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Contracts\Admin\Auth\TFA;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\LoginRequest;
use App\Http\Requests\Admin\Auth\LoginTfaRequest;
use App\Http\Response\Admin\Auth\LoginResponse;
use App\Http\Response\Admin\Auth\LogoutResponse;
use App\Http\Response\Admin\Auth\RefreshResponse;
use App\Contracts\Admin\Auth\Token\Access;
use App\Contracts\Admin\Auth\Token\Refresh;
use App\Services\Admin\Auth\UserService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use \Illuminate\Cache\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{


    protected $refreshTokenService;
    protected $accessTokenService;
    protected $TFAService;
    protected $userService;
    protected $limiter;

    protected $maxAttempts = 600;
    protected $decayMinutes = 10;

    public function __construct(
        Refresh $refreshTokenService, Access $accessTokenService, TFA $TFAService, UserService $userService, RateLimiter $rateLimiter
    ){
        $this->refreshTokenService = $refreshTokenService;
        $this->accessTokenService = $accessTokenService;
        $this->TFAService = $TFAService;
        $this->userService = $userService;
        $this->limiter = $rateLimiter;
    }

    public function login(LoginRequest $request)
    {
        if($this->limiter->tooManyAttempts($this->throttleKey($request), $this->maxAttempts)){

            $seconds = $this->limiter->availableIn($this->throttleKey($request));

            throw ValidationException::withMessages([
                $this->username() => [Lang::get('auth.throttle', [
                    'seconds' => $seconds,
                    'minutes' => ceil($seconds / 60),
                ])],
            ])->status(Response::HTTP_TOO_MANY_REQUESTS);
        }


        if ($this->guard()->validate($request->all())) {
            $this->limiter->clear($this->throttleKey($request));

            if($this->userService->isEnabledTfa($this->getCurrentUser())){
                return $this->sendTfaResponse();
            }
            $this->userService->setLastLogin($this->getCurrentUser());
            return $this->sendSuccessResponse();
        }

        $this->limiter->hit(
            $this->throttleKey($request), $this->decayMinutes * 60
        );

        throw ValidationException::withMessages([
            $this->username() => [trans('auth.failed')],
        ]);
    }

    public function refresh()
    {
        return $this->sendSuccessResponse();
    }

    protected function sendTfaResponse()
    {
        $qrCode = null;
        if($this->userService->isFirstLogin($this->getCurrentUser())){
            $this->userService->setTfaSecret(
                $this->getCurrentUser(),
                $this->TFAService->generateSecret()
            );
            $qrCode = $this->TFAService->generateQrCode(
                $this->userService->getLogin($this->getCurrentUser()),
                $this->userService->getTfaSecret($this->getCurrentUser()),
            );
        }

        return (new LoginResponse(true, $qrCode))
            ->withAccessToken(
                $this->accessTokenService->getTokenName(),
                $this->accessTokenService->createToken(
                    $this->getCurrentUser(),
                    $this->guard()->getLoginType()
                )
            );
    }

    protected function sendSuccessResponse()
    {
        return (new RefreshResponse())
            ->withAccessToken(
                $this->accessTokenService->getTokenName(),
                $this->accessTokenService->createToken(
                    $this->getCurrentUser(),
                    $this->guard()->getBaseType()
                )
            )->withRefreshToken(
                $this->refreshTokenService->getTokenName(),
                $this->refreshTokenService->regenerateToken(
                    $this->getCurrentUser()
                ),
                $this->refreshTokenService->getExpirationTime()
            );
    }

    public function logout()
    {
        $user = $this->getCurrentUser();
        $this->refreshTokenService->removeTokens($user);

        return new LogoutResponse;
    }

    protected function getCurrentUser()
    {
        return $this->guard()->user();
    }

    public function username()
    {
        return 'login';
    }

    protected function guard()
    {
        return Auth::guard();
    }

    protected function throttleKey(Request $request)
    {
        return Str::lower(
            ($request instanceof LoginTfaRequest) ?
                $this->getCurrentUser()->login :
                $request->input($this->username())
            ).'|'.$request->ip();
    }


}
