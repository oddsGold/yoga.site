<?php

namespace App\Providers;

use App\Contracts\Admin\Auth\Token\Access;
use App\Contracts\Admin\Auth\Token\Refresh;
use App\Extensions\AdminProvider;
use App\Extensions\JwtGuard;
use App\Models\User;
use Illuminate\Contracts\Hashing\Hasher as HasherContract;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [

        \App\Models\News::class => \App\Policies\NewsPolicy::class,
        \App\Models\Author::class => \App\Policies\AuthorPolicy::class,
        \App\Models\Faq::class => \App\Policies\FaqPolicy::class,
        \App\Models\Form\Presentation::class => \App\Policies\FormPresentationPolicy::class,
        \App\Models\SocialLinks::class => \App\Policies\SocialLinksPolicy::class,
        \App\Models\Program::class => \App\Policies\ProgramPolicy::class,
        \App\Models\Worth::class => \App\Policies\WorthPolicy::class,
        \App\Models\Learning::class => \App\Policies\LearningPolicy::class,
        \App\Models\Get::class => \App\Policies\GetPolicy::class,
        \App\Models\UserMemo\Type::class => \App\Policies\UserMemo\TypePolicy::class,
        \App\Models\UserMemo\UserMemo::class => \App\Policies\UserMemo\UserMemoPolicy::class,
        \App\Models\User::class => \App\Policies\UserPolicy::class,

    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Auth::provider('admin', function($app){
            return new AdminProvider(
                $app[HasherContract::class],
                User::class
            );
        });

        Auth::extend('jwt', function ($app, $name, array $config) {
            return new JwtGuard(
                Auth::createUserProvider($config['provider']),
                $app['request'],
                $app[Access::class],
                $app[Refresh::class],
                JwtGuard::parseType($name)
            );
        });
    }
}
