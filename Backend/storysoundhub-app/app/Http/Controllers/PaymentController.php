<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Charge;
use Stripe\Customer;

class PaymentController extends Controller
{
    public function checkout()
    {
        return view('checkout');
    }

    public function charge(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            $customer = Customer::create([
                'email' => $request->email,
                'source' => $request->stripeToken,
            ]);

            $charge = Charge::create([
                'customer' => $customer->id,
                'amount' => 1000, // Amount in cents ($10.00)
                'currency' => 'usd',
                'description' => 'Payment from Laravel App',
            ]);

            return back()->with('success', 'Payment Successful!');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}

