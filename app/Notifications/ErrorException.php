<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ErrorException extends Notification
{
    use Queueable;

    protected $message;
    protected $file;
    protected $line;
    protected $method;
    protected $path;
    protected $params;


    public function __construct($message, $file, $line, $method, $path, $params)
    {
        $this->message = $message;
        $this->file = $file;
        $this->line = $line;
        $this->method = $method;
        $this->path = $path;
        $this->params = $params;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail','database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $mail = (new MailMessage)
            ->error()
            ->subject('ErrorException')
            ->greeting( 'Error: '. $this->message)
            ->line($this->file . ':' . $this->line)
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

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'message' => $this->message,
            'file' => $this->file,
            'line' => $this->line,
            'method' => $this->method,
            'path' => $this->path
        ];
    }
}
