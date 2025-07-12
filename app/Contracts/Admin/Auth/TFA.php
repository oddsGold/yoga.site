<?php


namespace App\Contracts\Admin\Auth;


interface TFA
{
    public function isValidCode($code, $secret);

    public function generateSecret();

    public function generateCodeFromSecret($secret);

    public function generateQrCode($login, $code);

    public function getTfaName();

    public function getCode(TFAUser $user);

}
