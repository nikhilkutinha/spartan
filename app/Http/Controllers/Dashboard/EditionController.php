<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Edition;
use Inertia\Inertia;

class EditionController extends Controller
{
    /**
     * Display a listing of the games.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $search = request()->get('search');

        $editions = Edition::with('game')
            ->when(
                $search,
                fn ($query, $search) => $query->whereIn(
                    'editions.id',
                    Edition::search($search)->keys()
                )
            )
            ->select(['editions.*'])
            ->leftJoin('games', 'game_id', '=', 'games.id');

        return Inertia::render('Dashboard/Edition/Index', [
            'editions' => $editions->sort()->paginate(),
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
            request()->validate($this->rules())
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
            request()->validate($this->rules())
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

    /**
     * Form request validation rules.
     */
    protected function rules()
    {
        return [
            'name' => ['required', 'string'],
            'game_id' => ['required', 'integer', 'exists:App\Models\Game,id'],
        ];
    }
}
