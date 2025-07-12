<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckAllowedIps
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if(
            count($this->getAllowedIps()) > 0 and
            !in_array($request->getClientIp(), $this->getAllowedIps())
        ){
            abort(404);
        }

        return $next($request);
    }

    public function getAllowedIps(){
         return array_filter(explode(',', config('auth.allowed_ips', '')), function($ip){
             return trim($ip) != '';
         });
    }
}
