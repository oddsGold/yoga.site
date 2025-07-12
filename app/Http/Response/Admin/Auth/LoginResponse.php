<?php


namespace App\Http\Response\Admin\Auth;



class LoginResponse extends AuthResponse
{

    public function __construct($tfa = false, $tfaQrCode = null)
    {
        parent::__construct([
            'tfa' => $tfa,
            'tfa_qr_code' => $tfaQrCode
        ], 200);
    }
}

