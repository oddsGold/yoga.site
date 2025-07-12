<?php


namespace App\Extensions;

use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Contracts\Hashing\Hasher as HasherContract;

class AdminProvider extends EloquentUserProvider
{

    public function __construct(HasherContract $hashService, $model)
    {
        parent::__construct($hashService, $model);
    }

}
