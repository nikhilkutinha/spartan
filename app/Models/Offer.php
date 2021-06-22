<?php

namespace App\Models;

use App\Jobs\SynchronizeOffer;
use App\Sortable;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Offer extends Model
{
    use HasFactory,
        Sortable,
        Searchable;

    protected const SYNC_THRESHOLD = 1;

    /**
     * The fields that are sortable.
     *
     * @var array
     */
    public $sortables = [
        'games.title',
        'editions.id',
        'vendors.name',
        'offers.created_at',
        'offers.current_price',
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
     */
    public function getLowestPriceAttribute(): float
    {
        $entry = $this->history()->orderBy('price')->first();

        return $entry ? $entry->price
            : $this->current_price;
    }

    /**
     * Modify the query used to retrieve models when making all of the models searchable.
     */
    protected function makeAllSearchableUsing(Builder $query): Builder
    {
        return $query->with(['game', 'vendor']);
    }

    /**
     * Scope the query to reteieve offers that fall within the specified threshold.
     */
    protected function scopeWithinSyncThreshold(Builder $query): Builder
    {
        return $query->where(
            'last_synced_at',
            '<',
            Carbon::now()->subSeconds(self::SYNC_THRESHOLD)->toDateTimeString()
        )->orWhereNull('last_synced_at');
    }

    /**
     * Synchronize the offer with latest price.
     */
    public function sync()
    {
        SynchronizeOffer::dispatch(
            $this,
            app()->make($this->vendor->agent)
        )->onQueue($this->vendor->name);

        $this->update([
            'last_synced_at' => now()
        ]);
    }
}
