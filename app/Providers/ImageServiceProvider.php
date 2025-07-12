<?php


namespace App\Providers;


use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Vite;

class ImageServiceProvider extends ServiceProvider
{

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
        Vite::macro(
            'image',
            fn ($asset) => $this
                //->useBuildDirectory('bundles')
                ->asset("resources/assets/site/images/{$asset}")
        );
    }
}
