<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Expense;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ExpensesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $expenses = DB::table('expenses')->get();
            return $expenses;
        } catch (Exception $ex) {
            return response()->json(['message' => 'Expenses not found!', 'type' => 'error']);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $expense = new Expense;
            $expense->name = $request->input('name');
            $expense->amount = $request->input('amount');
            $expense->date = $request->input('date');
            $expense->save();
            return response()->json(['message' => 'Expense created', 'type' => 'success']);
        } catch (\Exception $ex) {
            return response()->json(['message' => 'Expense error', 'type' => 'error']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $expenseName = $request->input('name');
            $amount = $request->input('price');
            Expense::where('id', $id)->update(
                [
                    'name' => $expenseName,
                    'amount' => $amount
                ],
            );
            return response()->json(['message' => 'Expense updated', 'type' => 'success']);
        } catch (Exception $ex) {
            return response()->json(['message' => 'Expense update failed', 'type' => 'error']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($name)
    {
        try {
            Expense::where('name', $name)->delete();
            return response()->json(['message' => 'Expense deleted', 'type' => 'success']);
        } catch (ModelNotFoundException $ex) {
            return response()->json(['message' => 'Expense not found!', 'type' => 'error']);
        } catch (Exception $ex) {
            return response()->json(['message' => 'Delete exception', 'type' => 'error']);
        }
    }
}
