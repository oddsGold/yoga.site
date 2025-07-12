<?php


namespace App\Services\Admin\Auth;


use App\Contracts\Admin\Auth\TFA;
use App\Contracts\Admin\Auth\TFAUser;

use App\Contracts\QrCode;
use \Google\Authenticator\GoogleAuthenticator;


class GoogleAuthenticatorWithQrCode implements TFA
{

    protected QrCode $qrCodeGenerator;
    protected GoogleAuthenticator $googleAuthenticator;

    public function __construct(GoogleAuthenticator $ga, QrCode $qrCodeGenerator)
    {
        $this->googleAuthenticator = $ga;
        $this->qrCodeGenerator = $qrCodeGenerator;
    }

    public function getCode(TFAUser $user)
    {
        if($user && $user->isTfaEnabled()){
            return $this->generateCodeFromSecret($user->getTfaSecret());
        }
        return null;
    }

    public function isValidCode($code, $secret)
    {
        return $this->googleAuthenticator->checkCode(
            $secret,
            $code,
            4
        );
    }

    public function generateCodeFromSecret($secret)
    {
        return $this->googleAuthenticator->getCode($secret);
    }

    public function generateSecret()
    {
        return $this->googleAuthenticator->generateSecret();
    }

    public function generateQrCode($login, $code)
    {
        return $this->qrCodeGenerator->generate(
            'otpauth://totp/'.$login.'@'.request()->getHost().'?secret='. $code
        );
    }

    public function getTfaName()
    {
        return 'Google Authenticator';
    }

}
