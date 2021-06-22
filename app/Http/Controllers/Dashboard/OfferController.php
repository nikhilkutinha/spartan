<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use Inertia\Inertia;

class OfferController extends Controller
{
    /**
     * Display a listing of the offers.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $search = request()->get('search');

        $offers = Offer::with(['game', 'edition', 'vendor'])
            ->when(
                $search,
                fn ($query, $search) => $query->whereIn(
                    'offers.id',
                    Offer::search($search)->keys()
                )
            )
            ->select(['offers.*'])
            ->leftJoin('games', 'game_id', '=', 'games.id')
            ->leftJoin('editions', 'edition_id', '=', 'editions.id')
            ->leftJoin('vendors', 'vendor_id', '=', 'vendors.id');

        return Inertia::render('Dashboard/Offer/Index', [
            'offers' => $offers->sort()->paginate(),
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
            request()->validate($this->rules())
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
            request()->validate($this->rules())
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

    /**
     * Form request validation rules.
     */
    protected function rules()
    {
        return [
            'game_id' => ['required', 'integer', 'exists:App\Models\Game,id'],
            'edition_id' => ['required', 'integer', 'exists:App\Models\Edition,id'],
            'vendor_id' => ['required', 'integer', 'exists:App\Models\Vendor,id'],
            'current_price' => ['nullable', 'numeric'],
            'url' => ['required', 'url'],
        ];
    }
}
