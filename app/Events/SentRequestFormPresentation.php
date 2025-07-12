<?php


namespace App\Events;

use App\Models\Form\Presentation;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SentRequestFormPresentation
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Presentation $presentation;

    public function __construct(Presentation $presentation)
    {
        $this->presentation = $presentation;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }

}
