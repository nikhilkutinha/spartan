<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GameResource;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class GameController extends Controller
{
    /**
     * Display a listing of the games.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        return GameResource::collection(
            Game::search($request->get('search'))->paginate()
        );
    }
}
