<?php

namespace App\Listeners;

use App\Services\Admin\Auth\RoleService;
use App\Events\HappenedException;
use App\Notifications\ErrorException as ErrorExceptionNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Http\Request;
use Illuminate\Queue\InteractsWithQueue;
use \ParseError;
use \ErrorException;

class SendErrorExceptionNotification
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

        if(
            $event->exception instanceof ParseError ||
            $event->exception instanceof ErrorException
        ){

            foreach ($this->roleService->getErrorExceptionRole()->users as $user){
                $user->notify(new ErrorExceptionNotification(
                    $event->exception->getMessage() ?: class_basename($event->exception),
                    $event->exception->getFile(),
                    $event->exception->getLine(),
                    $this->request->getRealMethod(),
                    $this->request->getRequestUri(),
                    $this->request->all()
                ));
            }

        }

    }
}
