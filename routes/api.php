<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('/forms/feedback', [App\Http\Controllers\Site\FormController::class, 'feedback']);
Route::post('/forms/buy', [App\Http\Controllers\Site\FormController::class, 'buy']);
Route::post('/forms/presentation', [App\Http\Controllers\Site\FormController::class, 'presentation']);
Route::get('/presentation/download/{file}', [App\Http\Controllers\Site\FileController::class, 'downloadPresentation']);
Route::get('/faq', [App\Http\Controllers\Site\FaqController::class, 'index']);
Route::get('/download/{file}',  [App\Http\Controllers\Site\UserMemoController::class, 'download'])->name('downloadFile');


Route::middleware(['auth.ips'])->group(function(){
    Route::prefix('auth')->group(function () {

        Route::post('login',[App\Http\Controllers\Admin\Auth\LoginController::class, 'login']);

        Route::middleware(['auth:jwt/login'])->group(function(){
            Route::post('tfa',[App\Http\Controllers\Admin\Auth\TFAController::class, 'check'])->name('api.admin.auth.tfa');
            Route::get('tfa/forgot',[App\Http\Controllers\Admin\Auth\TFAController::class, 'forgot']);
        });

        Route::middleware(['auth:jwt/refresh'])->group(function(){
            Route::post('refresh-tokens',[App\Http\Controllers\Admin\Auth\LoginController::class, 'refresh'])->name('api.admin.auth.refresh');
        });

        Route::middleware(['auth:jwt/base'])->group(function(){
            Route::post('logout',[App\Http\Controllers\Admin\Auth\LoginController::class, 'logout']);
        });

    });

    Route::middleware(['auth:jwt/base'])->group(function(){

        Route::get('/news', [App\Http\Controllers\Admin\NewsApiController::class, 'getNews']);

        Route::get('form/presentation', [App\Http\Controllers\Admin\FormPresentationController::class, 'index']);
        Route::delete('form/presentation/{id}', [App\Http\Controllers\Admin\FormPresentationController::class, 'destroy']);

        Route::get('social', [App\Http\Controllers\Admin\SocialLinksController::class, 'index']);
        Route::get('social/{id}', [App\Http\Controllers\Admin\SocialLinksController::class, 'edit']);
        Route::post('social/{id}', [App\Http\Controllers\Admin\SocialLinksController::class, 'update']);

        Route::get('main', [App\Http\Controllers\Admin\MainController::class, 'index']);
        Route::get('main/{id}', [App\Http\Controllers\Admin\MainController::class, 'edit']);
        Route::post('main/{id}', [App\Http\Controllers\Admin\MainController::class, 'update']);
        Route::delete('main/{id}', [App\Http\Controllers\Admin\MainController::class, 'destroy']);
        Route::post('main', [App\Http\Controllers\Admin\MainController::class, 'store']);

        Route::get('program', [App\Http\Controllers\Admin\ProgramController::class, 'index']);
        Route::get('program/{id}', [App\Http\Controllers\Admin\ProgramController::class, 'edit']);
        Route::post('program/{id}', [App\Http\Controllers\Admin\ProgramController::class, 'update']);
        Route::delete('program/{id}', [App\Http\Controllers\Admin\ProgramController::class, 'destroy']);
        Route::post('program', [App\Http\Controllers\Admin\ProgramController::class, 'store']);

        Route::get('bonus', [App\Http\Controllers\Admin\BonusController::class, 'index']);
        Route::get('bonus/{id}', [App\Http\Controllers\Admin\BonusController::class, 'edit']);
        Route::post('bonus/{id}', [App\Http\Controllers\Admin\BonusController::class, 'update']);
        Route::delete('bonus/{id}', [App\Http\Controllers\Admin\BonusController::class, 'destroy']);
        Route::post('bonus', [App\Http\Controllers\Admin\BonusController::class, 'store']);

        Route::get('worth', [App\Http\Controllers\Admin\WorthController::class, 'index']);
        Route::get('worth/{id}', [App\Http\Controllers\Admin\WorthController::class, 'edit']);
        Route::post('worth/{id}', [App\Http\Controllers\Admin\WorthController::class, 'update']);
        Route::delete('worth/{id}', [App\Http\Controllers\Admin\WorthController::class, 'destroy']);
        Route::post('worth', [App\Http\Controllers\Admin\WorthController::class, 'store']);

        Route::get('learning', [App\Http\Controllers\Admin\LearningController::class, 'index']);
        Route::get('learning/{id}', [App\Http\Controllers\Admin\LearningController::class, 'edit']);
        Route::post('learning/{id}', [App\Http\Controllers\Admin\LearningController::class, 'update']);
        Route::delete('learning/{id}', [App\Http\Controllers\Admin\LearningController::class, 'destroy']);
        Route::post('learning', [App\Http\Controllers\Admin\LearningController::class, 'store']);

        Route::get('faqs', [App\Http\Controllers\Admin\FaqController::class, 'index']);
        Route::get('faqs/{id}', [App\Http\Controllers\Admin\FaqController::class, 'edit']);
        Route::post('faqs/{id}', [App\Http\Controllers\Admin\FaqController::class, 'update']);
        Route::delete('faqs/{id}', [App\Http\Controllers\Admin\FaqController::class, 'destroy']);
        Route::post('faqs', [App\Http\Controllers\Admin\FaqController::class, 'store']);

        Route::get('get', [App\Http\Controllers\Admin\GetController::class, 'index']);
        Route::get('get/{id}', [App\Http\Controllers\Admin\GetController::class, 'edit']);
        Route::post('get/{id}', [App\Http\Controllers\Admin\GetController::class, 'update']);
        Route::delete('get/{id}', [App\Http\Controllers\Admin\GetController::class, 'destroy']);
        Route::post('get', [App\Http\Controllers\Admin\GetController::class, 'store']);


        //News
        Route::get('videos', [App\Http\Controllers\Admin\AuthorController::class, 'index']);
        Route::get('videos/{id}', [App\Http\Controllers\Admin\AuthorController::class, 'edit']);
        Route::post('videos/{id}', [App\Http\Controllers\Admin\AuthorController::class, 'update']);
        Route::delete('videos/{id}', [App\Http\Controllers\Admin\AuthorController::class, 'destroy']);
        Route::post('videos', [App\Http\Controllers\Admin\AuthorController::class, 'store']);

        Route::get('users/memos/types', [App\Http\Controllers\Admin\UserMemo\TypeController::class, 'index']);
        Route::get('users/memos/types/{id}', [App\Http\Controllers\Admin\UserMemo\TypeController::class, 'edit']);
        Route::post('users/memos/types/{id}', [App\Http\Controllers\Admin\UserMemo\TypeController::class, 'update']);
        Route::delete('users/memos/types/{id}', [App\Http\Controllers\Admin\UserMemo\TypeController::class, 'destroy']);
        Route::post('users/memos/types', [App\Http\Controllers\Admin\UserMemo\TypeController::class, 'store']);

        Route::get('users/memos', [App\Http\Controllers\Admin\UserMemo\UserMemoController::class, 'index']);
        Route::get('users/memos/{id}', [App\Http\Controllers\Admin\UserMemo\UserMemoController::class, 'edit']);
        Route::post('users/memos/{id}', [App\Http\Controllers\Admin\UserMemo\UserMemoController::class, 'update']);
        Route::delete('users/memos/{id}', [App\Http\Controllers\Admin\UserMemo\UserMemoController::class, 'destroy']);
        Route::post('users/memos', [App\Http\Controllers\Admin\UserMemo\UserMemoController::class, 'store']);


        Route::get('users', [App\Http\Controllers\Admin\UserController::class, 'index']);
        Route::get('users/{id}', [App\Http\Controllers\Admin\UserController::class, 'edit']);
        Route::post('users/{id}', [App\Http\Controllers\Admin\UserController::class, 'update']);
        Route::delete('users/{id}', [App\Http\Controllers\Admin\UserController::class, 'destroy']);
        Route::post('users', [App\Http\Controllers\Admin\UserController::class, 'store']);

        Route::get('roles', [App\Http\Controllers\Admin\RoleController::class, 'index']);
        Route::get('roles/{id}', [App\Http\Controllers\Admin\RoleController::class, 'edit']);
        Route::post('roles/{id}', [App\Http\Controllers\Admin\RoleController::class, 'update']);
        Route::delete('roles/{id}', [App\Http\Controllers\Admin\RoleController::class, 'destroy']);
        Route::post('roles', [App\Http\Controllers\Admin\RoleController::class, 'store']);

        Route::get('resources', [App\Http\Controllers\Admin\ResourceController::class, 'index']);


        //Support service
        Route::get('files', [App\Http\Controllers\Admin\FileController::class, 'index']);
        Route::get('files/{id}',[App\Http\Controllers\Admin\FileController::class, 'show']);
        Route::delete('files/{id}', [App\Http\Controllers\Admin\FileController::class, 'destroy']);
        Route::post('files',[App\Http\Controllers\Admin\FileController::class, 'store']);

        Route::get('images', [App\Http\Controllers\Admin\ImageController::class, 'index']);
        Route::get('images/{id}',[App\Http\Controllers\Admin\ImageController::class, 'show']);
        Route::delete('images/{id}', [App\Http\Controllers\Admin\ImageController::class, 'destroy']);
        Route::post('images',[App\Http\Controllers\Admin\ImageController::class, 'store']);

        Route::get('account/menus',[App\Http\Controllers\Admin\MenuController::class, 'index']);
        Route::post('account/password',[App\Http\Controllers\Admin\AccountController::class, 'password']);
        Route::post('account/email',[App\Http\Controllers\Admin\AccountController::class, 'email']);
        Route::get('account',[App\Http\Controllers\Admin\AccountController::class, 'index']);

    });

});
