<?php


namespace App\Http\Controllers\Admin\Auth;


use App\Events\ForgotTFACode;
use App\Http\Requests\Admin\Auth\LoginTfaRequest;
use App\Http\Response\Admin\Auth\ForgotTFAResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\ValidationException;

class TFAController extends LoginController
{


    public function check(LoginTfaRequest $request)
    {
        if($this->limiter->tooManyAttempts($this->throttleKey($request), $this->maxAttempts)) {
            $seconds = $this->limiter->availableIn($this->throttleKey($request));

            throw ValidationException::withMessages([
                $this->username() => [Lang::get('auth.throttle', [
                    'seconds' => $seconds,
                    'minutes' => ceil($seconds / 60),
                ])],
            ])->status(Response::HTTP_TOO_MANY_REQUESTS);
        }

        if($this->TFAService->isValidCode(
            $request->code,
            $this->userService->getTfaSecret($this->getCurrentUser())
        )){
//            $this->limiter->clear($this->throttleKey($request));
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


    public function forgot()
    {
        ForgotTFACode::dispatch($this->getCurrentUser());
        new ForgotTFAResponse();
    }
}
