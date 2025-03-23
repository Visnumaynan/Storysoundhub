<?php

namespace App\Http\Controllers;

use App\Models\BookClubMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookClubMemberController extends Controller
{
    /**
     * Display a listing of members in a book club.
     */
    public function index($club_id)
    {
        $members = BookClubMember::where('club_id', $club_id)->with('user')->get();
        return response()->json($members);
    }

    /**
     * Add a user to a book club.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'club_id' => 'required|exists:book_clubs,club_id',
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $membership = BookClubMember::create([
            'club_id' => $request->club_id,
            'user_id' => $request->user_id,
        ]);

        return response()->json(['message' => 'User added to book club', 'data' => $membership], 201);
    }

    /**
     * Remove a user from a book club.
     */
    public function destroy($membership_id)
    {
        $membership = BookClubMember::find($membership_id);

        if (!$membership) {
            return response()->json(['message' => 'Membership not found'], 404);
        }

        $membership->delete();

        return response()->json(['message' => 'User removed from book club']);
    }
}
