<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Offer;
use Inertia\Inertia;

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
            $games = Game::search($query);
        } else {
            $games = Game::query();
        }

        return Inertia::render('Game/Index', [
            'games' => $games->paginate(20),
            'filters' => request()->all(),
        ]);
    }

    /**
     * Display the specified game.
     *
     * @param  int  $game
     * @return \Illuminate\Http\Response
     */
    public function show(int $game)
    {
        $game = Game::with('editions')->findOrFail($game);

        $edition = request()->get('edition');

        $offers = Offer::with('vendor')
            ->orderBy('current_price')
            ->where('game_id', $game->id)
            ->whereNotNull('current_price');

        if (!$edition && $lowest = $game->lowest_offer) {
            $edition = $lowest->edition_id;
        }

        $game->offers = $offers->where('edition_id', $edition)->get();

        return Inertia::render('Game/Show', [
            'game' => $game,
            'edition' => $edition,
            'filters' => request()->all(),
        ]);
    }
}
