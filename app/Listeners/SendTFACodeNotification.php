<?php

namespace App\Listeners;

use App\Contracts\Admin\Auth\TFA;
use App\Events\ForgotTFACode;
use App\Notifications\TFACode;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;


class SendTFACodeNotification
{

    protected $TFAService;

    public function __construct(TFA $TFAService)
    {
        $this->TFAService = $TFAService;
    }


    public function handle(ForgotTFACode $event)
    {
        if($code = $this->TFAService->getCode($event->user)){
            $event->user->notify(new TFACode($code));
        }
    }
}
