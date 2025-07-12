<?php


namespace App\Contracts\Admin\Auth;


interface TFAUser
{

    public function isTfaEnabled();

    public function getTfaSecret();

    public function setTfaSecret($secret);

    public function getLogin();

}
