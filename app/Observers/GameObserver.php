<?php

namespace App\Observers;

use App\Models\Edition;
use App\Models\Game;

class GameObserver
{
    /**
     * Handle the Game "created" event.
     */
    public function created(Game $game)
    {
        Edition::create([
            'name' => 'Base',
            'game_id' => $game->id
        ]);
    }
}
