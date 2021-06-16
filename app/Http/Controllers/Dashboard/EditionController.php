<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Edition;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class EditionController extends Controller
{
    /**
     * Display a listing of the games.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = request()->get('search');

        $editions = Edition::with('game')
            ->select(['editions.*'])
            ->leftJoin('games', 'game_id', '=', 'games.id');

        if ($query) {
            $keyArray = Edition::search($query)
                ->keys()
                ->toArray();

            $editions = $editions->whereIn('editions.id', $keyArray);
        }

        return Inertia::render('Dashboard/Edition/Index', [
            'editions' => $editions->sort('created_at')->paginate(),
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
        return Inertia::render('Dashboard/Edition/Create');
    }

    /**
     * Store a newly created game in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        Edition::create(
            request()->validate([
                'name' => ['required', 'string'],
                'game_id' => ['required', 'integer', 'exists:App\Models\Game,id'],
            ])
        );

        return redirect()->back()->with('success', 'Edition created.');;
    }

    /**
     * Show the form for editing the specified game.
     *
     * @param  int  $edition
     * @return \Illuminate\Http\Response
     */
    public function edit(int $edition)
    {
        return Inertia::render('Dashboard/Edition/Edit', [
            'edition' => Edition::with('game')->findOrFail($edition),
        ]);
    }

    /**
     * Update the specified game in storage.
     *
     * @param  \App\Models\Edition  $edition
     * @return \Illuminate\Http\Response
     */
    public function update(Edition $edition)
    {
        $edition->update(
            request()->validate([
                'name' => ['required', 'string'],
                'game_id' => ['required', 'integer', 'exists:App\Models\Game,id'],
            ])
        );
        
        return redirect()->back()->with('success', 'Edition updated.');
    }

    /**
     * Remove the specified game from storage.
     *
     * @param  \App\Models\Edition  $edition
     * @return \Illuminate\Http\Response
     */
    public function destroy(Edition $edition)
    {
        $edition->delete();

        return redirect()->back()->with('success', 'Edition deleted.');
    }
}
