<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class BookController extends Controller
{
    /**
     * Display a listing of books.
     */
    public function index()
    {
        $books = Book::with('genre', 'owner')->get();
        return response()->json($books);
    }

    /**
     * Store a newly created book.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'isbn' => 'nullable|string|max:20',
            'author' => 'required|string|max:255',
            'type' => 'required|string|max:50',
            'picture' => 'required|string',
            'genre_id' => 'required|exists:genres,genre_id',
            'price' => 'required|numeric|min:0',
            'short_description' => 'nullable|string',
            'owner_id' => 'required|exists:users,id',
            'condition' => 'required|string|max:50',
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $book = Book::create([
            'book_id' => (string) Str::uuid(), // Generate UUID
            'title' => $request->title,
            'isbn' => $request->isbn,
            'author' => $request->author,
            'type' => $request->type,
            'picture' => $request->picture,
            'genre_id' => $request->genre_id,
            'price' => $request->price,
            'short_description' => $request->short_description,
            'owner_id' => $request->owner_id,
            'condition' => $request->condition,
            'quantity' => $request->quantity,
        ]);

        return response()->json(['message' => 'Book added successfully', 'data' => $book], 201);
    }

    /**
     * Display the specified book.
     */
    public function show($id)
    {
        $book = Book::with('genre', 'owner')->find($id);

        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        return response()->json($book);
    }

    /**
     * Update the specified book.
     */
    public function update(Request $request, $id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'isbn' => 'nullable|string|max:20',
            'author' => 'sometimes|string|max:255',
            'type' => 'sometimes|string|max:50',
            'picture' => 'sometimes|string',
            'genre_id' => 'sometimes|exists:genres,genre_id',
            'price' => 'sometimes|numeric|min:0',
            'short_description' => 'nullable|string',
            'owner_id' => 'sometimes|exists:users,id',
            'condition' => 'sometimes|string|max:50',
            'quantity' => 'sometimes|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $book->update($request->only([
            'title', 'isbn', 'author', 'type', 'picture', 'genre_id',
            'price', 'short_description', 'owner_id', 'condition', 'quantity'
        ]));

        return response()->json(['message' => 'Book updated successfully', 'data' => $book]);
    }

    /**
     * Remove the specified book.
     */
    public function destroy($id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        $book->delete();

        return response()->json(['message' => 'Book deleted successfully']);
    }
}
