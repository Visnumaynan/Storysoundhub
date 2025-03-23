<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentController;


Route::get('/', function () {
    return view('welcome');
});




Route::get('/checkout', [PaymentController::class, 'checkout']);
Route::post('/charge', [PaymentController::class, 'charge'])->name('charge');

