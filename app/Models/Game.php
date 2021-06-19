<?php

namespace App\Models;

use App\Sortable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Laravel\Scout\Searchable;

class Game extends Model
{
    use HasFactory,
        Sortable,
        Searchable;

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
     * The attributes that should be hidden for array representation.
     *
     * @var array
     */
    protected $hidden = [
        'poster_path',
        'backdrop_path',
    ];

    /**
     * The accessors to append to the model's array representation.
     *
     * @var array
     */
    protected $appends = [
        'poster_url',
        'backdrop_url',
        'current_lowest_price',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'platforms' => 'array',
        'genres' => 'array',
    ];

    /**
     * The price history associated with the game.
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasManyThrough
     */
    public function offerHistory()
    {
        return $this->hasManyThrough(History::class, Offer::class);
    }

    /**
     * The offers associated with the game.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function offers()
    {
        return $this->hasMany(Offer::class);
    }

    /**
     * Get the offer with the lowest price.
     *
     * @return \App\Models\Offer|null
     */
    public function getLowestOfferAttribute()
    {
        return $this->offers()
            ->where('current_price', '!=', null)
            ->orderBy('current_price')
            ->first();
    }

    public function getCurrentLowestPriceAttribute()
    {
        if (!$this->lowest_offer) return;

        return $this->lowest_offer->current_price;
    }

    /**
     * The editions associated with the game.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function editions()
    {
        return $this->hasMany(Edition::class);
    }

    /**
     * Get the URL to the poster.
     *
     * @return string
     */
    public function getPosterUrlAttribute()
    {
        if (filter_var($this->poster_path, FILTER_VALIDATE_URL)) return $this->poster_path;

        return $this->poster_path
            ?  Storage::disk('local')->url($this->poster_path)
            : '';
    }

    /**
     * Get the URL to the backdrop.
     *
     * @return string
     */
    public function getBackdropUrlAttribute()
    {
        if (filter_var($this->backdrop_path, FILTER_VALIDATE_URL)) return $this->backdrop_path;

        return $this->backdrop_path
            ?  Storage::disk('local')->url($this->backdrop_path)
            : '';
    }
}
