<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Client;
use App\Payment;
use Symfony\Component\Console\Output\ConsoleOutput;
use Illuminate\Support\Facades\DB;

class ClientsController extends Controller
{

    public function index()
    {
        $clients = DB::table('clients')->get();
        return $clients;
    }

    public function findByName($name)
    {
        $client = DB::table('clients')->where('name', $name)->get();
        return $client;
    }

    public function dataListings()
    {
        return Client::select('name')->get();
    }


    public function store(Request $request)
    {
        $client = new Client;
        $client->name = $request->input('clientName');
        $client->money_transfered = $request->input('price');
        $client->membership_valid = $request->input('expirationDate');
        $client->save();

        $payment = new Payment;
        $payment->from = $request->input('clientName');
        $payment->amount = $request->input('price');
        $payment->date = date("Y/m/d");
        $payment->save();

        return http_response_code(201);
    }

    public function updateMembership(Request $request)
    {
        $clientName = $request->input('name');
        $price = $request->input('price');
        $expirationDate = $request->input('expirationDate');
        Client::where('name', $clientName)->update(
            [
                'membership_valid' => $expirationDate,
                'money_transfered' => DB::raw('money_transfered + ' . $price)
            ],
        );

        $payment = new Payment;
        $payment->from = $request->input('name');
        $payment->amount = $request->input('price');
        $payment->date = date("Y/m/d");
        $payment->save();
    }

    public function destroy(Request $request)
    {
        $clientName = $request->input('name');
        Client::where('name', $clientName)->delete();
    }
}
