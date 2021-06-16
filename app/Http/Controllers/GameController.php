<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Offer;
use Inertia\Inertia;
use Illuminate\SUpport\Facades\DB;
use MarcReichel\IGDBLaravel\Models\Game as IGDBGame;

class GameController extends Controller
{
    /**
     * Display a listing of the games.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        // DB::enableQueryLog();
        
        $games = Game::paginate(20);
    
        // dd(DB::getQueryLog());
    
        return Inertia::render('Game/Index', compact('games'));
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
            ->where('game_id', '=', $game->id)
            ->where('current_price', '!=', null);

        if (!$edition && $lowest = $game->lowest_offer) {
            $edition = $lowest->edition_id;
        }

        $game->offers = $offers->where('edition_id', $edition)->get();

        // return $game;

        return Inertia::render('Game/Show', [
            'game' => $game,
            'edition' => $edition,
            'filters' => request()->all(),
        ]);
    }
}
