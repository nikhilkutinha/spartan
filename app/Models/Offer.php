<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use App\Sortable;

class Offer extends Model
{
    use HasFactory;
    use Sortable;
    use Searchable;

    /**
     * The fields that are sortable.
     * 
     * @var array
     */
    public $sortables = [
        'games.title',
        'editions.id',
        'vendors.name',
        'created_at',
        'current_price',
    ];

    /**
     * The fields that are not mass fillable.
     * 
     * @var array
     */
    protected $guarded = [
        'id',
        'created_at',
    ];

    /**
     * The accessors to append to the model's array representation.
     *
     * @var array
     */
    protected $appends = [
        'lowest_price',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'last_synced_at' => 'datetime',
    ];

    /**
     * The vendor associated with the offer.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    /**
     * The game associated with the offer.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    /**
     * The price history associated with the offer.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function history()
    {
        return $this->hasMany(History::class);
    }

    /**
     * The edition associated with the offer.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */ 
    public function edition()
    {
        return $this->belongsTo(Edition::class);
    }

    /**
     * Get the lowest price from history.
     * 
     * @return float
     */
    public function getLowestPriceAttribute()
    {
        $entry = $this->history()->orderBy('price')->first();

        return $entry ? $entry->price
            : $this->current_price;
    }

    /**
     * Modify the query used to retrieve models when making all of the models searchable.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function makeAllSearchableUsing($query)
    {
        return $query->with(['game', 'vendor']);
    }
}
