<?php

namespace App\Http\Controllers;

use App\Models\BookTransaction;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BookTransactionController extends Controller
{
    // Get all transactions
    public function index()
    {
        return response()->json(BookTransaction::all(), 200);
    }

    // Store a new transaction
    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_id' => 'required|uuid|exists:books,book_id',
            'buyer_id' => 'required|exists:users,id',
            'seller_id' => 'required|exists:users,id',
            'price' => 'required|numeric|min:0',
            'status' => 'in:pending,completed,cancelled'
        ]);

        $transaction = BookTransaction::create($validated);
        return response()->json($transaction, 201);
    }

    // Get a single transaction
    public function show($id)
    {
        $transaction = BookTransaction::find($id);
        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }
        return response()->json($transaction, 200);
    }

    // Update transaction
    public function update(Request $request, $id)
    {
        $transaction = BookTransaction::find($id);
        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        $validated = $request->validate([
            'status' => 'in:pending,completed,cancelled'
        ]);

        $transaction->update($validated);
        return response()->json($transaction, 200);
    }

    // Delete a transaction
 
}
