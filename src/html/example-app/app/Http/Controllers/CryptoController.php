<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCryptoRequest;
use App\Http\Requests\UpdateCryptoRequest;
use App\Models\Crypto;

class CryptoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Http\Requests\StoreCryptoRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCryptoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Crypto  $crypto
     * @return \Illuminate\Http\Response
     */
    public function show(Crypto $crypto)
    {
        $crypto = Crypto::get();
        return $crypto;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Crypto  $crypto
     * @return \Illuminate\Http\Response
     */
    public function edit(Crypto $crypto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCryptoRequest  $request
     * @param  \App\Models\Crypto  $crypto
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCryptoRequest $request, Crypto $crypto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Crypto  $crypto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Crypto $crypto)
    {
        //
    }
}
