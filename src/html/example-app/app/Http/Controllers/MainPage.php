<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class MainPage extends Controller
{
    public function __invoke()
    {
        $info = DB::table('Crypto')->get();
        return $info;

    }
}
