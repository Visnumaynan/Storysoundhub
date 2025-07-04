<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of all posts.
     */
    public function index()
    {
        $posts = Post::with(['bookClubMember', 'club'])->get();
        return response()->json($posts);
    }

    /**
     * Store a newly created post.
     */
    // public function store(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'membership_id' => 'required|exists:book_club_members,membership_id',
    //         'club_id' => 'nullable|exists:book_clubs,club_id',
    //         'content' => 'required|string',
    //         'media' => 'nullable|string',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['errors' => $validator->errors()], 422);
    //     }

    //     $post = Post::create([
    //         'post_id' => (string) Str::uuid(), // Ensure UUID generation
    //         'membership_id' => $request->membership_id,
    //         'club_id' => $request->club_id,
    //         'content' => $request->content,
    //         'media' => $request->media,
    //     ]);

    //     return response()->json(['message' => 'Post created successfully', 'data' => $post], 201);
    // }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'membership_id' => 'required|exists:book_club_members,membership_id',
            'club_id' => 'nullable|exists:book_clubs,club_id',
            'content' => 'required|string',
            'media' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Ensure the uploaded file is an image
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $mediaPath = null;
        if ($request->hasFile('media')) {
            $file = $request->file('media');
            $mediaPath = $file->store('uploads/posts', 'public'); // Store in 'storage/app/public/uploads/posts'
        }

        $post = Post::create([
            'post_id' => (string) Str::uuid(),
            'membership_id' => $request->membership_id,
            'club_id' => $request->club_id,
            'content' => $request->content,
            'media' => $mediaPath ? asset('storage/' . $mediaPath) : null, // Convert to public URL
        ]);

        return response()->json(['message' => 'Post created successfully', 'data' => $post], 201);
    }


    /**
     * Display a specific post.
     */
    public function show($id)
    {
        $post = Post::with(['bookClubMember', 'club'])->find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        return response()->json($post);
    }

    /**
     * Update a post's content or media.
     */
    // public function update(Request $request, $id)
    // {
    //     $post = Post::find($id);

    //     if (!$post) {
    //         return response()->json(['message' => 'Post not found'], 404);
    //     }

    //     $validator = Validator::make($request->all(), [
    //         'content' => 'required|string',
    //         'media' => 'nullable|string',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['errors' => $validator->errors()], 422);
    //     }

    //     $post->update([
    //         'content' => $request->content,
    //         'media' => $request->media,
    //     ]);

    //     return response()->json(['message' => 'Post updated successfully', 'data' => $post]);
    // }

    public function update(Request $request, $id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
            'media' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->hasFile('media')) {
            $file = $request->file('media');
            $mediaPath = $file->store('uploads/posts', 'public');
            $post->media = asset('storage/' . $mediaPath);
        }

        $post->content = $request->content;
        $post->save();

        return response()->json(['message' => 'Post updated successfully', 'data' => $post]);
    }


    /**
     * Remove the specified post.
     */
    public function destroy($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }
}
