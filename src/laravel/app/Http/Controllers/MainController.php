<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use Illuminate\Http\Request;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class MainController extends Controller
{
    public function __invoke()
    {
        return "Single";
    }
    public function main(){
        return view('main.index');
    }
}