<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use Inertia\Inertia;

class VendorController extends Controller
{
    /**
     * Display a listing of the vendors.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $search = request()->get('search');

        $vendors = Vendor::when(
            $search,
            fn ($query, $search) => $query->whereIn(
                'id',
                Vendor::search($search)->keys()
            )
        );

        return Inertia::render('Dashboard/Vendor/Index', [
            'vendors' => $vendors->sort()->paginate(),
            'filters' => request()->all(),
        ]);
    }

    /**
     * Show the form for creating a new vendor.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Dashboard/Vendor/Create');
    }

    /**
     * Store a newly created vendor in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        Vendor::create(
            request()->validate($this->rules())
        );

        return redirect()->back()->with('success', 'Vendor created.');
    }

    /**
     * Show the form for editing the specified vendor.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function edit(Vendor $vendor)
    {
        return Inertia::render('Dashboard/Vendor/Edit', compact('vendor'));
    }

    /**
     * Update the specified vendor in storage.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function update(Vendor $vendor)
    {
        $vendor->update(
            request()->validate($this->rules())
        );

        return redirect()->back()->with('success', 'Vendor updated.');
    }

    /**
     * Remove the specified vendor from storage.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vendor $vendor)
    {
        $vendor->delete();

        return redirect()->back()->with('success', 'Vendor deleted.');
    }
    
    /**
     * Form request validation rules.
     */
    protected function rules()
    {
        return [
            'name' => ['required', 'string'],
            'url' => ['required', 'url'],
            'agent' => ['required', 'string'],
        ];
    }
}
