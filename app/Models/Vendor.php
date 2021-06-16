<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use App\Sortable;

class Vendor extends Model
{
    use HasFactory;
    use Sortable;
    use Searchable;

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
