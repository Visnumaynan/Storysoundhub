<?php

namespace App\Http\Controllers;

use App\Models\BookTransaction;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookTransactionController extends Controller
{
    /**
     * Display a listing of all book transactions.
     */
    public function index()
    {
        $transactions = BookTransaction::with(['book', 'buyer', 'seller'])->get();
        return response()->json($transactions);
    }

    /**
     * Store a newly created book transaction.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'book_id' => 'required|exists:books,book_id',
            'buyer_id' => 'required|exists:users,id',
            'seller_id' => 'required|exists:users,id',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:pending,completed,cancelled',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $transaction = BookTransaction::create([
            'book_id' => $request->book_id,
            'buyer_id' => $request->buyer_id,
            'seller_id' => $request->seller_id,
            'price' => $request->price,
            'status' => $request->status,
        ]);

        return response()->json(['message' => 'Transaction recorded successfully', 'data' => $transaction], 201);
    }

    /**
     * Display a specific book transaction.
     */
    public function show($id)
    {
        $transaction = BookTransaction::with(['book', 'buyer', 'seller'])->find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        return response()->json($transaction);
    }

    /**
     * Update the status of a transaction.
     */
    public function update(Request $request, $id)
    {
        $transaction = BookTransaction::find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,completed,cancelled',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $transaction->update([
            'status' => $request->status,
        ]);

        // If the transaction is completed, soft delete the book
        if ($request->status == 'completed') {
            $book = Book::find($transaction->book_id);
            if ($book) {
                $book->delete(); // Soft delete the book
            }
        }

        return response()->json(['message' => 'Transaction status updated successfully', 'data' => $transaction]);
    }

    /**
     * Remove the specified book transaction.
     */
    public function destroy($id)
    {
        $transaction = BookTransaction::find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        $transaction->delete();

        return response()->json(['message' => 'Transaction deleted successfully']);
    }
}
