<?php

namespace App\Policies;

use App\Models\News;

class NewsPolicy extends BasePolicy
{

    protected $model = News::class;

}
