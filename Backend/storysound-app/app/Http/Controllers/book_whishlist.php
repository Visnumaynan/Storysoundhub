<?php

namespace App\Http\Controllers;
use App\Models\book_whishlist as ModelsBook_whishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class book_whishlist extends Controller
{
    /**
     * Display a listing of the wishlist items for a user.
     */
    public function index($userId)
    {
        $wishlist = ModelsBook_whishlist::where('user_id', $userId)->with('book')->get();
        return response()->json($wishlist);
    }

    /**
     * Store a newly created wishlist item.
     */
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'user_id' => 'required|exists:users,id',
    //         'book_id' => 'required|exists:books,book_id',
    //         'picture' => 'nullable|string',
    //     ]);

    //     dd($request->all());
    //     $wishlist = ModelsBook_whishlist::create($request->all());
    //     return response()->json(['message' => 'Book added to wishlist', 'data' => $wishlist], 201);
    // }


    public function store(Request $request)
{
    try {
        // Validate incoming request
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,book_id',
            'picture' => 'nullable|string',
        ]);

        // Debugging: Inspect the request payload
        dd($request->all());

        // Create a wishlist record
        $wishlist = ModelsBook_whishlist::create($request->all());

        // Return success response
        return response()->json(['message' => 'Book added to wishlist', 'data' => $wishlist], 201);
    } catch (\Exception $e) {
        // Log the error for debugging
        Log::error('Error storing wishlist item: ' . $e->getMessage());

        // Return error response
        return response()->json(['error' => 'Failed to add book to wishlist', 'details' => $e->getMessage()], 500);
    }
}

    /**
     * Remove the specified wishlist item.
     */
    public function destroy($id)
    {
        $wishlistItem = ModelsBook_whishlist::findOrFail($id);
        $wishlistItem->delete();
        return response()->json(['message' => 'Book removed from wishlist']);
    }
}
