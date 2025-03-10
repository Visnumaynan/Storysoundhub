<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GenreController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// test
Route::prefix('genres')->group(function () {
    // Get all genres
    Route::get('/', [GenreController::class, 'index']);

    // Create a new genre
    Route::post('/', [GenreController::class, 'store']);

    // Get a specific genre by ID
    Route::get('/{id}', [GenreController::class, 'show']);

    // Update a specific genre by ID
    Route::put('/{id}', [GenreController::class, 'update']);

    // Delete a specific genre by ID
    Route::delete('/{id}', [GenreController::class, 'destroy']);
});