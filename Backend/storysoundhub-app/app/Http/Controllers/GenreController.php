<?php

namespace App\Http\Controllers;

use App\Models\genres;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;




class GenreController extends Controller
{
     // Display a listing of genres
     public function index()
     {
         $genres = genres::all();
         return response()->json($genres);
     }
 
     // Store a newly created genre
     public function store(Request $request)
     {
         $validator = Validator::make($request->all(), [
             'name' => 'required|string|max:255',
         ]);
 
         if ($validator->fails()) {
             return response()->json(['errors' => $validator->errors()], 422);
         }
 
         $genre = genres::create([
             'genre_id' => (string) Str::uuid(), // Ensure UUID generation
             'name' => $request->name,
         ]);
 
         return response()->json($genre, 201);
     }
 
     // Display the specified genre
     public function show($id)
     {
         $genre = genres::find($id);
 
         if (!$genre) {
             return response()->json(['message' => 'Genre not found'], 404);
         }
 
         return response()->json($genre);
     }
 
     // Update the specified genre
     public function update(Request $request, $id)
     {
         $genre = genres::find($id);
 
         if (!$genre) {
             return response()->json(['message' => 'Genre not found'], 404);
         }
 
         $validator = Validator::make($request->all(), [
             'name' => 'required|string|max:255',
         ]);
 
         if ($validator->fails()) {
             return response()->json(['errors' => $validator->errors()], 422);
         }
 
         $genre->update($request->only('name'));
 
         return response()->json($genre);
     }
 
     // Remove the specified genre
     public function destroy($id)
     {
         $genre = genres::find($id);
 
         if (!$genre) {
             return response()->json(['message' => 'Genre not found'], 404);
         }
 
         $genre->delete();
 
         return response()->json(['message' => 'Genre deleted successfully']);
     }
}
