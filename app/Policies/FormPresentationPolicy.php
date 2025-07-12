<?php


namespace App\Policies;


use App\Models\Form\Presentation;

class FormPresentationPolicy extends BasePolicy
{
    protected $model = Presentation::class;
}
