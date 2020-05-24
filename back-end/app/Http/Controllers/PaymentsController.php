<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class PaymentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    /* Get expenses and payments for given period */
    public function index($fromDate, $toDate)
    {
        try {
            return DB::select('WITH recursive all_dates(date) AS (
            SELECT :fromDate date
            UNION ALL
            SELECT date + interval 1 day FROM all_dates WHERE date + interval 1 day <= :toDate
    )
    SELECT d.date date, \'payment\' AS type ,COALESCE(SUM(p.amount),0) AS payments
            FROM all_dates d
            LEFT JOIN payments p ON p.date = d.date
            GROUP BY d.date
            UNION
    SELECT d.date date, \'expense\' AS type ,COALESCE(SUM(e.amount),0) AS expenses
    FROM all_dates d
    LEFT JOIN expenses e ON e.date = d.date
    GROUP BY d.date', ['fromDate' => $fromDate, 'toDate' => $toDate]);
        } catch (Exception $ex) {
            return response()->json(['message' => 'Profit get failed', 'type' => 'error']);
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
