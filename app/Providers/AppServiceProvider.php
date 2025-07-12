<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Pagination\Paginator;

class AppServiceProvider extends ServiceProvider
{


    public $bindings = [

        \App\Contracts\Http::class => \App\Services\HttpService::class,
        \App\Contracts\QrCode::class => \App\Services\QrCodeGenerator::class,
        \App\Contracts\PDF::class => \App\Services\PDFService::class,

        \App\Services\FileService::class,
        \App\Services\ImageService::class,
        \App\Services\FormService::class,
        \App\Services\NewsService::class,
        \App\Services\VideoService::class,
        \App\Services\FaqService::class,
        \App\Services\UserMemo\UserMemoService::class,
        \App\Services\UserMemo\TypeService::class,
        \App\Services\MedocApiService::class,


    ];

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(\App\Contracts\ImageSaver::class, function(){
            return new \App\Services\DiskSaver('images');
        });
        $this->app->bind(\App\Contracts\FileSaver::class, function(){
            return new \App\Services\DiskSaver('files');
        });

    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

    }
}
