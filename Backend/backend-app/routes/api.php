<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\BookWishlistController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BookClubController;
use App\Http\Controllers\BookClubMemberController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookTransactionController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;




Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::prefix('genres')->group(function () {
    Route::get('/', [GenreController::class, 'index']); // Get all genres
    Route::post('/', [GenreController::class, 'store']); // Create a new genre
    Route::get('{id}', [GenreController::class, 'show']); // Get a specific genre
    Route::put('{id}', [GenreController::class, 'update']); // Update a specific genre
    Route::delete('{id}', [GenreController::class, 'destroy']); // Delete a specific genre
});



Route::prefix('wishlist')->group(function () {
    Route::get('/{userId}', [BookWishlistController::class, 'index']); // Get wishlist for a user
    Route::post('/', [BookWishlistController::class, 'store']); // Add a book to wishlist
    Route::delete('/{id}', [BookWishlistController::class, 'destroy']); // Remove a book from wishlist
});



Route::prefix('users')->group(function () {
    Route::post('/', [UserController::class, 'store']); // Store a new user
    Route::get('/{id}', [UserController::class, 'show']); // Show user (only name & email)
});



Route::prefix('book-clubs')->group(function () {
    Route::get('/', [BookClubController::class, 'index']); // Get all book clubs
    Route::post('/', [BookClubController::class, 'store']); // Create a book club
    Route::get('/{id}', [BookClubController::class, 'show']); // Get a single book club
    Route::put('/{id}', [BookClubController::class, 'update']); // Update a book club
    Route::delete('/{id}', [BookClubController::class, 'destroy']); // Delete a book club
});



Route::prefix('book-club-members')->group(function () {
    Route::get('/{club_id}', [BookClubMemberController::class, 'index']); // Get all members of a book club
    Route::post('/', [BookClubMemberController::class, 'store']); // Add a user to a book club
    Route::delete('/{membership_id}', [BookClubMemberController::class, 'destroy']); // Remove a user from a book club
});



Route::prefix('books')->group(function () {
    Route::get('/', [BookController::class, 'index']); // Get all books
    Route::post('/', [BookController::class, 'store']); // Create a new book
    Route::get('/{id}', [BookController::class, 'show']); // Get a single book
    Route::put('/{id}', [BookController::class, 'update']); // Update a book
    Route::delete('/{id}', [BookController::class, 'destroy']); // Delete a book
});




Route::prefix('transactions')->group(function () {
    Route::get('/', [BookTransactionController::class, 'index']); // Get all transactions
    Route::post('/', [BookTransactionController::class, 'store']); // Create a new transaction
    Route::get('/{id}', [BookTransactionController::class, 'show']); // Get a single transaction
    Route::put('/{id}', [BookTransactionController::class, 'update']); // Update transaction status
    Route::delete('/{id}', [BookTransactionController::class, 'destroy']); // Delete a transaction
});



Route::prefix('posts')->group(function () {
    Route::get('/', [PostController::class, 'index']); // Get all posts
    Route::post('/', [PostController::class, 'store']); // Create a new post
    Route::get('/{id}', [PostController::class, 'show']); // Get a single post
    Route::put('/{id}', [PostController::class, 'update']); // Update post content/media
    Route::delete('/{id}', [PostController::class, 'destroy']); // Delete a post
});



Route::prefix('comments')->group(function () {
    Route::get('/post/{postId}', [CommentController::class, 'index']); // Get all comments for a post
    Route::post('/', [CommentController::class, 'store']); // Create a new comment
    Route::get('/{id}', [CommentController::class, 'show']); // Get a single comment
    Route::put('/{id}', [CommentController::class, 'update']); // Update a comment
    Route::delete('/{id}', [CommentController::class, 'destroy']); // Delete a comment
});
