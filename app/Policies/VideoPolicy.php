<?php


namespace App\Policies;


use App\Models\Video;

class VideoPolicy extends BasePolicy
{
    protected $model = Video::class;
}
