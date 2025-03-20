<?php

namespace App\Http\Controllers;

use App\Models\BookClub;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class BookClubController extends Controller
{
    /**
     * Display a listing of book clubs.
     */
    public function index()
    {
        $bookClubs = BookClub::all();
        return response()->json($bookClubs);
    }

    /**
     * Store a newly created book club.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'club_name' => 'required|string|max:255',
            'creator_user_id' => 'required|exists:users,id',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $bookClub = BookClub::create([
            'club_id' => (string) Str::uuid(), // Generate UUID
            'club_name' => $request->club_name,
            'creator_user_id' => $request->creator_user_id,
            'description' => $request->description,
        ]);

        return response()->json(['message' => 'Book club created successfully', 'data' => $bookClub], 201);
    }

    /**
     * Display the specified book club.
     */
    public function show($id)
    {
        $bookClub = BookClub::find($id);

        if (!$bookClub) {
            return response()->json(['message' => 'Book club not found'], 404);
        }

        return response()->json($bookClub);
    }

    /**
     * Update the specified book club.
     */
    public function update(Request $request, $id)
    {
        $bookClub = BookClub::find($id);

        if (!$bookClub) {
            return response()->json(['message' => 'Book club not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'club_name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $bookClub->update($request->only(['club_name', 'description']));

        return response()->json(['message' => 'Book club updated successfully', 'data' => $bookClub]);
    }

    /**
     * Remove the specified book club.
     */
    public function destroy($id)
    {
        $bookClub = BookClub::find($id);

        if (!$bookClub) {
            return response()->json(['message' => 'Book club not found'], 404);
        }

        $bookClub->delete();

        return response()->json(['message' => 'Book club deleted successfully']);
    }
}
