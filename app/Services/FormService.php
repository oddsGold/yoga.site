<?php


namespace App\Services;

use App\Events\SentRequestFormPresentation;
use App\Models\Form\Feedback;
use App\Models\Form\Buy;
use App\Models\Form\Presentation;
use App\Events\SentRequestFormFeedback;
use App\Events\SentRequestFormBuy;

class FormService
{

    public function createFeedback($data)
    {
        $feedback = $this->save(new Feedback, $data);
        SentRequestFormFeedback::dispatch($feedback);
        return $feedback;
    }

    public function createBuy($data)
    {
        $buy = $this->save(new Buy, $data);
        SentRequestFormBuy::dispatch($buy);
        return $buy;
    }

    public function createPresentation($data)
    {
        $presentation = $this->save(new Presentation, $data);
        SentRequestFormPresentation::dispatch($presentation);
        return $presentation;
    }

    protected function save($model, $data)
    {
        $model->fill($data);
        $model->user_agent = request()->header('user-agent', 'none');
        $model->ip_address = request()->getClientIp();
        $model->save();
        return $model;
    }
}
