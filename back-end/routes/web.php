<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Symfony\Component\Console\Output\ConsoleOutput;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/api/clients', "ClientsController@index");
Route::get('/api/clients/dataListings', "ClientsController@dataListings");
Route::post('/api/create-membership', "ClientsController@store");
Route::put('/api/update-membership', "ClientsController@updateMembership");
Route::get('/api/clients/{name}', "ClientsController@findByName");
Route::delete('/api/clients/delete', "ClientsController@destroy");

Route::get('/api/expenses', "ExpensesController@index");
Route::post('/api/expense', "ExpensesController@store");
Route::post('/api/update-expense', "ExpensesController@update");
Route::delete('/api/expense/{name}', "ExpensesController@destroy");

Route::get('/api/workouts', "WorkoutController@index");
Route::post('/api/workout', "WorkoutController@store");
Route::post('/api/update-workout', "WorkoutController@update");
Route::delete('/api/workout/{id}', "WorkoutController@destroy");