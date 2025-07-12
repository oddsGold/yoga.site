<?php


namespace App\Listeners;


use App\Events\SentRequestFormBuy;
use App\Notifications\BuyForm;
use Illuminate\Support\Facades\Notification;

class SendBuyFormNotification
{
    public function handle(SentRequestFormBuy $event)
    {
        Notification::route('mail', ['andrey.shamanskiy@gmail.com', 'ettn@edi.com.ua'])
            ->notify(new BuyForm(
                $event->buy->name,
                $event->buy->phone,
                $event->buy->email,
                $event->buy->edrpou,
                $event->buy->orgName,
                $event->buy->type,
                $event->buy->accountable,
                $event->buy->question,
                $event->buy->ip_address,
                $event->buy->created_at
            ));
    }
}
