<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class History extends Model
{
    use HasFactory;

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
     * Scope a query to only include today's entries.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCreatedToday($query)
    {
        return $query->whereDate('created_at', Carbon::today());
    }
}
