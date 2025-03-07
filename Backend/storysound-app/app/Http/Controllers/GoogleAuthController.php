<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class GoogleAuthController extends Controller
{
    // Redirect to Google
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    // Handle Google Callback
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            $existingUser = User::where('google_id', $googleUser->id)->first();

            if ($existingUser) {
                // Update profile photo if it’s changed (optional)
                $existingUser->update([
                    'profile_photo' => $googleUser->avatar,
                ]);
                Auth::login($existingUser, true);
            } else {
                // Create a new user with the profile photo
                $newUser = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'profile_photo' => $googleUser->avatar, // Add the photo URL
                    'password' => bcrypt(Str::random(16)), // Random password
                ]);

                Auth::login($newUser, true);
            }

            return redirect()->intended('/dashboard');
        } catch (\Exception $e) {
            return redirect('/login')->with('error', 'Something went wrong with Google login: ' . $e->getMessage());
        }
    }
}
