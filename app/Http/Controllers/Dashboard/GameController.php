<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Game;
use App\Models\Genre;
use App\Http\Controllers\Controller;
use App\IGDB;
use Inertia\Inertia;
use Illuminate\Http\Request;

class GameController extends Controller
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
            $keyArray = Game::search($query)->keys()->toArray();
            $games = Game::whereIn('id', $keyArray);
        } else {
            $games = Game::query();
        }

        return Inertia::render('Dashboard/Game/Index', [
            'games' => $games->sort('created_at')->paginate(),
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
        return Inertia::render('Dashboard/Game/Create');
    }



    /**
     * Store a newly created game in storage.
     *
     * @param  \Illuminate\Http\Request  request()
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        request()->validate([
            'igdb_url' => ['required', 'url']
        ]);

        $igdb = IGDB::url(request()['igdb_url'])
            ->gatherInformation();

        // dd($igdb);

        Game::create([
            'title' => $igdb['name'],
            'description' => $igdb['summary'],
            'released_on' => $igdb['first_release_date'],
            'poster_path' => $igdb['cover'],
            'platforms' => $igdb['platforms'],
            'genres' => $igdb['genres'],
            'backdrop_path' => $igdb['screenshot'],
        ]);

        return redirect()->back()->with('success', 'Game created.');
    }

    /**
     * Display the specified game.
     *
     * @param  \App\Models\Game  $game
     * @return \Illuminate\Http\Response
     */
    public function show(Game $game)
    {

        $game->with('backdrop_url');

        return Inertia::render('Game/Show', compact('game'));
    }

    /**
     * Show the form for editing the specified game.
     *
     * @param  \App\Models\Game  $game
     * @return \Illuminate\Http\Response
     */
    public function edit(Game $game)
    {
        return Inertia::render('Dashboard/Game/Edit', compact('game'));
    }

    /**
     * Update the specified game in storage.
     *
     * @param  \Illuminate\Http\Request  request()
     * @param  \App\Models\Game  $game
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Game $game)
    {
        $game->update(
            request()->validate([
                'title' => ['required', 'string'],
                'description' => ['nullable', 'string'],
                'released_on' => ['nullable', 'date'],
                'poster_path' => ['nullable', 'url'],
                'backdrop_path' => ['nullable', 'url'],
            ])
        );

        $game->save();

        return redirect()->back()->with('success', 'Game updated.');
    }

    /**
     * Remove the specified game from storage.
     *
     * @param  \App\Models\Game  $game
     * @return \Illuminate\Http\Response
     */
    public function destroy(Game $game)
    {
        $game->delete();

        return redirect()->back()->with('success', 'Game deleted.');
    }
}
