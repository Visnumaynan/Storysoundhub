<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// use App\Http\Controllers\BookController;

// // Fetch all books
// Route::get('/books', [BookController::class, 'index']);

// // Fetch a specific book by ID
// Route::get('/books/{id}', [BookController::class, 'show']);

// // Create a new book
// Route::post('/books', [BookController::class, 'store']);

// // Update a book
// Route::put('/books/{id}', [BookController::class, 'update']);
// Route::patch('/books/{id}', [BookController::class, 'update']); // Optional

// // Delete a book
// Route::delete('/books/{id}', [BookController::class, 'destroy']);


use App\Http\Controllers\BookController;

// Public routes (anyone can access)
Route::get('/books', [BookController::class, 'index']); // View all books
Route::get('/books/{id}', [BookController::class, 'show']); // View a specific book

// Routes requiring authentication (protected by Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    // Users can view their own books
    Route::get('/my-books', [BookController::class, 'myBooks']);

    // Users can add a new book
    Route::post('/books', [BookController::class, 'store']);

    // Users can update their own book
    Route::put('/books/{id}', [BookController::class, 'update']);

    // Users can delete their own book
    Route::delete('/books/{id}', [BookController::class, 'destroy']);
});
