<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class BookController extends Controller
{
    // Anyone can view all books
    public function index()
    {
        return response()->json(Book::all(), 200);
    }

    // Users can only view their own books
    public function myBooks()
    {
        $userId = Auth::id();
        $books = Book::where('owner_id', $userId)->get();

        return response()->json($books, 200);
    }

    // Users can add their own books
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'isbn' => 'nullable|string',
            'author' => 'required|string',
            'type' => 'required|string',
            'picture' => 'required|string',
            'genre_id' => 'required|uuid|exists:genres,genre_id',
            'price' => 'required|numeric|min:0',
            'short_description' => 'nullable|string',
            'condition' => 'required|string',
            'quantity' => 'required|integer|min:1',
        ]);

        $book = Book::create([
            'book_id' => Str::uuid(),
            'title' => $request->title,
            'isbn' => $request->isbn,
            'author' => $request->author,
            'type' => $request->type,
            'picture' => $request->picture,
            'genre_id' => $request->genre_id,
            'price' => $request->price,
            'short_description' => $request->short_description,
            'owner_id' => Auth::id(), // Automatically assign the logged-in user as the owner
            'condition' => $request->condition,
            'quantity' => $request->quantity,
        ]);

        return response()->json($book, 201);
    }

    // Anyone can view a specific book
    public function show($id)
    {
        $book = Book::findOrFail($id);
        return response()->json($book, 200);
    }

    // Users can only update their own books
    public function update(Request $request, $id)
    {
        $book = Book::findOrFail($id);

        if ($book->owner_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $book->update($request->all());

        return response()->json($book, 200);
    }

    // Users can only delete their own books
    public function destroy($id)
    {
        $book = Book::findOrFail($id);

        if ($book->owner_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $book->delete();

        return response()->json(['message' => 'Book deleted successfully'], 200);
    }
}
