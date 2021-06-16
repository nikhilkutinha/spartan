<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Offer;
use Inertia\Inertia;
use App\Http\Controllers\Controller;


class OfferController extends Controller
{
    /**
     * Display a listing of the offers.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = request()->get('search');

        $offers = Offer::with(['game', 'edition', 'vendor'])
            ->select(['offers.*'])
            ->leftJoin('games', 'game_id', '=', 'games.id')
            ->leftJoin('editions', 'edition_id', '=', 'editions.id')
            ->leftJoin('vendors', 'vendor_id', '=', 'vendors.id');

        if ($query) {
            $keyArray = Offer::search($query)
                ->keys()
                ->toArray();

            $offers = $offers->whereIn('offers.id', $keyArray);
        }

        return Inertia::render('Dashboard/Offer/Index', [
            'offers' => $offers->sort('created_at')->paginate(),
            'filters' => request()->all(),
        ]);
    }

    /**
     * Show the form for creating a new offer.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Dashboard/Offer/Create');
    }

    /**
     * Store a newly created offer in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        Offer::create(
            request()->validate([
                'game_id' => ['required', 'integer', 'exists:App\Models\Game,id'],
                'edition_id' => ['required', 'integer', 'exists:App\Models\Edition,id'],
                'vendor_id' => ['required', 'integer', 'exists:App\Models\Vendor,id'],
                'url' => ['required', 'url'],
            ])
        );

        return redirect()->back()->with('success', 'Offer created.');;
    }

    /**
     * Show the form for editing the specified offer.
     *
     * @param  int  $offer
     * @return \Illuminate\Http\Response
     */
    public function edit(int $offer)
    {
        return Inertia::render('Dashboard/Offer/Edit', [
            'offer' => Offer::with('vendor', 'game.editions')->findOrFail($offer),
        ]);
    }

    /**
     * Update the specified offer in storage.
     *
     * @param  \App\Models\Offer  $offer
     * @return \Illuminate\Http\Response
     */
    public function update(Offer $offer)
    {
        $offer->update(
            request()->validate([
                'game_id' => ['required', 'integer', 'exists:App\Models\Game,id'],
                'edition_id' => ['required', 'integer', 'exists:App\Models\Edition,id'],
                'vendor_id' => ['required', 'integer', 'exists:App\Models\Vendor,id'],
                'url' => ['required', 'url'],
            ])
        );

        return redirect()->back()->with('success', 'Offer updated.');
    }

    /**
     * Remove the specified offer from storage.
     *
     * @param  \App\Models\Offer  $offer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Offer $offer)
    {
        $offer->delete();

        return redirect()->back()->with('success', 'Offer deleted.');
    }
}
