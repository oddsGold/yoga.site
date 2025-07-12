<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class HttpException extends Notification
{
    use Queueable;

    protected $code;
    protected $message;
    protected $method;
    protected $path;
    protected $params;

    public function __construct($code, $message, $method, $path, $params)
    {
        $this->code = $code;
        $this->message = $message;
        $this->method = $method;
        $this->path = $path;
        $this->params = $params;
    }

    public function via($notifiable)
    {
        return ['mail','database'];
    }

    public function toMail($notifiable)
    {
        $mail = (new MailMessage)
            ->subject('[' . $this->code . '] ' . 'HttpException')
            ->greeting('[' . $this->code . '] ' . $this->message)
            ->line($this->method . ' ' . $this->path);

        if(count($this->params) > 0){
            $mail->line('Params:');
            foreach ($this->params as $name => $value){
                $mail->line(' - '.$name . ' => ' . $value);
            }
        }

        $mail->salutation('@');

        return $mail;
    }

    public function toArray($notifiable)
    {
        return [
            'code' => $this->code,
            'message' => $this->message,
            'method' => $this->method,
            'path' => $this->path
        ];
    }
}
