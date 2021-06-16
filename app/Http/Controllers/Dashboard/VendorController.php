<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;


class VendorController extends Controller
{
    /**
     * Display a listing of the games.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = request()->get('search');

        if ($query) {
            $keyArray = Vendor::search($query)
                ->keys()
                ->toArray();

            $vendors = Vendor::whereIn('id', $keyArray);
        } else {
            $vendors = Vendor::query();
        }

        return Inertia::render('Dashboard/Vendor/Index', [
            'vendors' => $vendors->sort('created_at')->paginate(),
            'filters' => request()->all(),
        ]);
    }

    /**
     * Show the form for creating a new game.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Dashboard/Vendor/Create');
    }

    /**
     * Store a newly created game in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        Vendor::create(
            request()->validate([
                'name' => ['required', 'string'],
                'url' => ['required', 'url'],
                'agent' => ['required', 'string'],
            ])
        );

        return redirect()->back()->with('success', 'Vendor created.');;
    }

    /**
     * Show the form for editing the specified game.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function edit(Vendor $vendor)
    {
        return Inertia::render('Dashboard/Vendor/Edit', compact('vendor'));
    }

    /**
     * Update the specified game in storage.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function update(Vendor $vendor)
    {
        $vendor->update(
            request()->validate([
                'name' => ['required', 'string'],
                'url' => ['required', 'url'],
                'agent' => ['required', 'string'],
            ])
        );

        return redirect()->back()->with('success', 'Vendor updated.');
    }

    /**
     * Remove the specified game from storage.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vendor $vendor)
    {
        $vendor->delete();

        return redirect()->back()->with('success', 'Vendor deleted.');
    }
}
