<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\GameController;
use App\Http\Controllers\Dashboard\VendorController;
use App\Http\Controllers\Dashboard\OfferController;
use App\Http\Controllers\Dashboard\EditionController;


Route::get('/dashboard', function () {
    return redirect('/dashboard/games');
})->name('dashboard');

Route::prefix('dashboard')->name('dashboard.')->group(function () {
    Route::resource('games', GameController::class);
    Route::resource('editions', EditionController::class);
    Route::resource('offers', OfferController::class);
    Route::resource('vendors', VendorController::class);
});