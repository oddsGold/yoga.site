<?php

namespace App\Contracts;

interface QrCode
{

    public function generate($data, $size = 300, $margin = 5);

}
