<?php

namespace App\Listeners;

use App\Events\HappenedException;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Notifications\HttpException as HttpExceptionNotification;
use \Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use App\Services\Admin\Auth\RoleService;

class SendHttpExceptionNotification
{

    protected $request;
    protected $roleService;

    public function __construct(Request $request, RoleService $roleService)
    {
        $this->request = $request;
        $this->roleService = $roleService;
    }

    public function handle(HappenedException $event)
    {

        if($event->exception instanceof HttpExceptionInterface){

            foreach ($this->roleService->getHttpExceptionRole()->users as $user){
                $user->notify(new HttpExceptionNotification(
                    $event->exception->getStatusCode(),
                    $event->exception->getMessage() ?: class_basename($event->exception),
                    $this->request->getRealMethod(),
                    $this->request->getRequestUri(),
                    $this->request->all()
                ));
            }

            //Notification::route('mail', 'verbraund@gmail.com')
            //    ->notify(new HttpExceptionNotification(
            //        $event->exception->getStatusCode(),
            //        $event->exception->getMessage() ?: class_basename($event->exception),
            //        $this->request->getRealMethod(),
            //        $this->request->getRequestUri(),
            //        $this->request->all()
            //    ));

        }

    }
}
