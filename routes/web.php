<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



/// Admin
Route::middleware(['auth.ips'])->group(function(){
    Route::prefix('admin')->group(function () {
        Route::any('/',[App\Http\Controllers\Admin\BaseController::class, 'index'])
            ->name('admin');
        Route::any('{all}',[App\Http\Controllers\Admin\BaseController::class, 'index'])
            ->where('all', '.*');
    });
});



Route::get('/', [App\Http\Controllers\Site\HomeController::class, 'index'])->name('home');

Route::post('/payments/create', [App\Http\Controllers\Site\PaymentController::class, 'createPayment']);
Route::get('/payment', [App\Http\Controllers\Site\PaymentController::class, 'showPaymentForm'])->name('payment.form');
Route::post('/payment/process', [App\Http\Controllers\Site\PaymentController::class, 'processPayment'])->name('payment.process');
Route::post('/payment/callback', [App\Http\Controllers\Site\PaymentController::class, 'handleCallback'])->name('payment.callback');
