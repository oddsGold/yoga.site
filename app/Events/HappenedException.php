<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Throwable;

class HappenedException
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public $exception;

    public function __construct(Throwable $exception)
    {
        $this->exception = $exception;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
