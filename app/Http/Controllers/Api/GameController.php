<?php

namespace App\Http\Controllers\Api;

use App\Models\Game;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\GameResource;

class GameController extends Controller
{
    /**
     * Display a listing of the games.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   
        $query = $request->get('search');

        if ($query) {
            $keyArray = Game::search($query)->keys()->toArray();
            $games = Game::whereIn('id', $keyArray);
        } else {
            $games = Game::query();
        }
        
        return GameResource::collection($games->paginate());
    }
}
