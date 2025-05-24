<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class UserNotification implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $message;
    public string $type;

    /**
     * Create a new event instance.
     */
    public function __construct(string $message, string $type = 'info')
    {
        // Log::info('UserNotification event created', ['message' => $message, 'type' => $type]);
        $this->message = $message;
        $this->type = $type;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        log::info('Broadcasting on notifications channel', ['message' => $this->message, 'type' => $this->type]);
        // Return a new Channel instance for the 'notifications' channel
        return 
            [new Channel('notifications'),]
        ;
    }
    public function broadcastAs(): string
    {
        return 'UserNotification';
    }
    public function broadcastWith(): array
    {
        $data = [
            'message' => $this->message,
            'type' => $this->type,
        ];
        log::info('Broadcasting with data', $data);
        return $data;
    }
}
