<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Client;
use Symfony\Component\Console\Output\ConsoleOutput;


class ClientsController extends Controller
{

    public function index(Request $request)
    {
        $output = new ConsoleOutput();
        $output->writeln($request);
        echo "data";
    }

    public function store(Request $request)
    {
        $output = new ConsoleOutput();
        $output->writeln($request);
        echo "data";
    }
} 
