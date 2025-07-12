<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BuyForm extends Notification
{
    use Queueable;

    protected string $name;
    protected string|null $phone;
    protected string $email;
    protected string|null $edrpou;
    protected string|null $orgName;
    protected string|null $accountable;
    protected string|null $type;
    protected string|null $question;
    protected string $ip_address;
    protected string $date;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($name, $phone, $email, $edrpou, $orgName, $accountable, $type, $question, $date, $ip_address)
    {
        $this->name = $name;
        $this->phone = $phone;
        $this->email = $email;
        $this->edrpou = $edrpou;
        $this->orgName = $orgName;
        $this->type = $type;
        $this->accountable = $accountable;
        $this->question = $question;
        $this->ip_address = $ip_address;
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
            ->greeting('Придбати COTA CRS' . request()->getHost())
            ->subject("Придбати COTA CRS" . request()->getHost())
            ->line( new \Illuminate\Support\HtmlString('Ім`я: <i style="color: #000000">' . $this->name. '</i>'))
            ->line( new \Illuminate\Support\HtmlString('Телефон: <i style="color: #000000">' . $this->phone. '</i>'))
            ->line( new \Illuminate\Support\HtmlString('Е-мейл: <i style="color: #000000">' . $this->email. '</i>'))
            ->line( new \Illuminate\Support\HtmlString('Код ЄДРПОУ/ДРФО: <i style="color: #000000">' . $this->edrpou. '</i>'))
            ->line( new \Illuminate\Support\HtmlString('Назва організації: <i style="color: #000000">' . $this->orgName. '</i>'))
            ->line( new \Illuminate\Support\HtmlString('Тип рішення: <i style="color: #000000">' . $this->type. '</i>'))
            ->line( new \Illuminate\Support\HtmlString('Робота з підзвітними установами: <i style="color: #000000">' . $this->accountable. '</i>'))
            ->line( new \Illuminate\Support\HtmlString('Ваше запитання: <i style="color: #000000">' . $this->question. '</i>'))
            ->line( new \Illuminate\Support\HtmlString('Час: <i style="color: #000000">' . $this->date. '</i>'))
            ->line( new \Illuminate\Support\HtmlString('ІП адреса: <i style="color: #000000">' . $this->ip_address . '</i>'))
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
            'phone' => $this->phone,
            'email' => $this->email,
            'edrpou' => $this->edrpou,
            'orgName' => $this->orgName,
            'type' => $this->type,
            'accountable' => $this->accountable,
            'question' => $this->question,
            'ip_address' => $this->ip_address,
            'date' => $this->date,
        ];
    }
}
