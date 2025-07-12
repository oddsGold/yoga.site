<?php


namespace App\Events;

use App\Models\Form\Buy;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SentRequestFormBuy
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Buy $buy;

    public function __construct(Buy $buy)
    {
        $this->buy = $buy;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }

}
