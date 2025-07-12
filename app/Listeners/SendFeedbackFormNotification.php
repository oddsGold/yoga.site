<?php


namespace App\Listeners;


use App\Events\SentRequestFormFeedback;
use App\Notifications\FeedbackForm;
use Illuminate\Support\Facades\Notification;

class SendFeedbackFormNotification
{
    public function handle(SentRequestFormFeedback $event)
    {
        Notification::route('mail', ['andrey.shamanskiy@gmail.com', 'ettn@edi.com.ua'])
            ->notify(new FeedbackForm(
                $event->feedback->name,
                $event->feedback->phone,
                $event->feedback->email,
                $event->feedback->edrpou,
                $event->feedback->orgName,
                $event->feedback->type,
                $event->feedback->accountable,
                $event->feedback->question,
                $event->feedback->ip_address,
                $event->feedback->created_at
            ));
    }
}
