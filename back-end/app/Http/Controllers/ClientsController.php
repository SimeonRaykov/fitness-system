<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Client;
use App\Payment;
use Symfony\Component\Console\Output\ConsoleOutput;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ClientsController extends Controller
{

    public function index()
    {
        try {
            $clients = DB::table('clients')->get();
            return $clients;
        } catch (Exception $ex) {
            return response()->json(['message' => 'Clients not found!', 'type' => 'error']);
        }
    }

    public function findByName($name)
    {
        try {
            $client = DB::table('clients')->where('name', $name)->get();
            return $client;
        } catch (ModelNotFoundException $ex) {
            return response()->json(['message' => 'Client not found!', 'type' => 'error']);
        } catch (Exception $ex) {
            return response()->json(['message' => 'Find by name not found exception!', 'type' => 'error']);
        }
    }

    public function dataListings()
    {
        return Client::select('name')->get();
    }


    public function store(Request $request)
    {
        try {
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

            return response()->json(['message' => 'Client created', 'type' => 'success']);
        } catch (\Exception $ex) {
            if ($ex->getCode() == 23000) {
                return response()->json(['message' => 'Client exists', 'type' => 'error']);
            }
        }
    }

    public function updateMembership(Request $request, $id)
    {
        try {
            $price = $request->input('price');
            $expirationDate = $request->input('date');
            Client::where('id', $id)->update(
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

            return response()->json(['message' => 'Membership updated', 'type' => 'success']);
        } catch (Exception $ex) {
            return response()->json(['message' => 'Membership update failed', 'type' => 'error']);
        }
    }

    public function destroy(Request $request, $id)
    {
        try {
            Client::where('id', $id)->delete();
            return response()->json(['message' => 'Client deleted', 'type' => 'success']);
        } catch (ModelNotFoundException $ex) {
            return response()->json(['message' => 'Client not found!', 'type' => 'error']);
        } catch (Exception $ex) {
            return response()->json(['message' => 'Delete exception', 'type' => 'error']);
        }
    }
}
