<?php

namespace App\Http\Controllers;
use App\Models\book_whishlist as ModelsBook_whishlist;
use Illuminate\Http\Request;

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
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,book_id',
            'picture' => 'nullable|string',
        ]);

        $wishlist = ModelsBook_whishlist::create($request->all());
        return response()->json(['message' => 'Book added to wishlist', 'data' => $wishlist], 201);
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
