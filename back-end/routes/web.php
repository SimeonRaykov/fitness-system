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
Route::post('/api/create-membership', "ClientsController@store");
Route::get('/api/clients/:name', "ClientsController@findByName");
Route::delete('/api/clients/delete', "ClientsController@remove");
