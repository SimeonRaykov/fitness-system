<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Client;
use Symfony\Component\Console\Output\ConsoleOutput;
use Illuminate\Support\Facades\DB;

class ClientsController extends Controller
{

    public function index()
    {
        $clients = DB::table('clients')->get();
        return $clients;
    }

    public function store(Request $request)
    {
        $client = new Client;
        $client->name = $request->input('clientName');
        $client->money_transfered = $request->input('price');
        $client->membership_valid = $request->input('expirationDate');
        $client->save();
        return http_response_code(201);
    }

    public function updateMembership(Request $request)
    {
        $clientName = $request->input('clientName');
        $price = $request->input('price');
        $expirationDate = $request->input('expirationDate');
        Client::where('name', $clientName)->update(
            [
                'membership_valid' => $expirationDate,
                'money_transfered' => DB::raw('money_transfered + ' . $price)
            ],
        );
    }

    public function remove(Request $request)
    {
        $clientName = $request->input('clientName');
        Client::where('name', $clientName)->delete();
    }
}
