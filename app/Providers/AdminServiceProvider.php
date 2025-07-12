<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AdminServiceProvider extends ServiceProvider
{


    public $bindings = [

        \App\Services\Admin\Auth\UserService::class,
        \App\Services\Admin\Auth\RoleService::class,
        \App\Services\Admin\Auth\ResourceService::class,

        \App\Contracts\Admin\Auth\Token\Access::class => \App\Services\Admin\Auth\JWTService::class,
        \App\Contracts\Admin\Auth\Token\Refresh::class => \App\Services\Admin\Auth\SimpleToken::class,
        \App\Contracts\Admin\Auth\TFA::class => \App\Services\Admin\Auth\GoogleAuthenticatorWithQrCode::class,

        \App\Services\Admin\Query\OptionsService::class,
        \App\Services\Admin\Query\FilterService::class,
        \App\Services\Admin\Query\SortService::class,
        \App\Services\Admin\Query\SearchService::class,
        \App\Services\Admin\Query\PaginateService::class,
        \App\Services\Admin\MenuService::class,
    ];


    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
