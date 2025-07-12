<?php


namespace App\Listeners;


use App\Events\SentRequestFormPresentation;
use App\Notifications\PresentationForm;
use Illuminate\Support\Facades\Notification;

class SendPresentationFormNotification
{
    public function handle(SentRequestFormPresentation $event)
    {
        Notification::route('mail', ['ds.intelserv@gmail.com'])
            ->notify(new PresentationForm(
                $event->presentation->name,
                $event->presentation->nickname,
                $event->presentation->phone,
                $event->presentation->email,
                $event->presentation->created_at
            ));
    }
}
