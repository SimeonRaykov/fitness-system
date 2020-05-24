<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Workout;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class WorkoutController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $workouts = DB::table('workouts')->get();
            return $workouts;
        } catch (Exception $ex) {
            return response()->json(['message' => 'Workouts not found!', 'type' => 'error']);
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
            $workout = new Workout;
            $workout->name = $request->input('name');
            $workout->link = $request->input('link');
            $workout->save();
            return response()->json(['message' => 'Workout created', 'type' => 'success']);
        } catch (\Exception $ex) {
            if ($ex->getCode() == 23000) {
                return response()->json(['message' => 'Workout exists', 'type' => 'error']);
            }
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
            $workoutName = $request->input('name');
            $workoutLink = $request->input('link');
            Workout::where('id', $id)->update(
                [
                    'name' => $workoutName,
                    'link' => $workoutLink
                ],
            );
            return response()->json(['message' => 'Workout updated', 'type' => 'success']);
        } catch (Exception $ex) {
            return response()->json(['message' => 'Workout update failed', 'type' => 'error']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            Workout::where('id', $id)->delete();
            return response()->json(['message' => 'Workout deleted', 'type' => 'success']);
        } catch (ModelNotFoundException $ex) {
            return response()->json(['message' => 'Workout not found!', 'type' => 'error']);
        } catch (Exception $ex) {
            return response()->json(['message' => 'Delete exception', 'type' => 'error']);
        }
    }
}
