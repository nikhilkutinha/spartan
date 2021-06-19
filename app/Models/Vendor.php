<?php

namespace App\Models;

use App\Sortable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Vendor extends Model
{
    use HasFactory,
        Sortable,
        Searchable;

    /**
     * The fields that aren't mass fillable.
     *
     * @var array
     */
    protected $guarded = [
        'id',
        'created_at',
    ];
}
