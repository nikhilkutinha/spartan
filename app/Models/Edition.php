<?php

namespace App\Models;

use App\Sortable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Edition extends Model
{
    use HasFactory,
        Sortable,
        Searchable;

    /**
     * The fields that are sortable.
     *
     * @var array
     */
    public $sortables = [
        'games.title',
        'name',
        'created_at',
    ];

    /**
     * The fields that aren't mass fillable.
     *
     * @var array
     */
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    /**
     * The game assiciated with the edition.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    /**
     * Modify the query used to retrieve models when making all of the models searchable.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function makeAllSearchableUsing($query)
    {
        return $query->with('game');
    }
}
