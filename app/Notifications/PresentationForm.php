<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PresentationForm extends Notification
{
    use Queueable;

    protected string $name;
    protected string $nickname;
    protected string|null $phone;
    protected string $email;
    protected string $date;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($name, $nickname, $phone, $email, $date)
    {
        $this->name = $name;
        $this->nickname = $nickname;
        $this->phone = $phone;
        $this->email = $email;
        $this->date = $date;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->greeting('Форма для доступ до курсу Сім струн душі. Йога, аромати й чакри, що пробуджують твою силу')
            ->subject("Форма для доступ до курсу 'Сім струн душі'")
            ->line( new \Illuminate\Support\HtmlString('Ім`я: <i style="color: #000000">' . $this->name. '</i>'))
            ->line( new \Illuminate\Support\HtmlString('Нік в телеграмі: <i style="color: #000000">' . $this->nickname. '</i>'))
            ->line( new \Illuminate\Support\HtmlString('Телефон: <i style="color: #000000">' . $this->phone. '</i>'))
            ->line( new \Illuminate\Support\HtmlString('Е-мейл: <i style="color: #000000">' . $this->email. '</i>'))
            ->line( new \Illuminate\Support\HtmlString('Час: <i style="color: #000000">' . $this->date. '</i>'))
            ->line( new \Illuminate\Support\HtmlString("<a target='_blank' href='".url('/')."'>".request()->getHost()."</a>"));
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
            'name' => $this->name,
            'nickname' => $this->nickname,
            'phone' => $this->phone,
            'email' => $this->email,
            'date' => $this->date,
        ];
    }
}
