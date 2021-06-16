<?php

namespace App\Observers;

use App\Models\Game;
use App\Models\Edition;

class GameObserver
{
    /**
     * Handle the Game "created" event.
     *
     * @param  \App\Models\Game  $game
     * @return void
     */
    public function created(Game $game)
    {
        Edition::create([
            'name' => 'Base',
            'game_id' => $game->id
        ]);
    }
}
