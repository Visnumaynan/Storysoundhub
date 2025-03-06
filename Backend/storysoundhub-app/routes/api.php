<?php

use App\Http\Controllers\GenreController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

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