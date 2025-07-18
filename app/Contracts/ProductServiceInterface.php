<?php

namespace App\Contracts;

interface ProductServiceInterface
{
    public function findProduct($id);

    public function getModel();
}
