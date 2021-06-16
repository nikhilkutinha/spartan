<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Schema;

trait Sortable
{
    /**
     * Scope a query to sort results.
     * 
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $sort
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSort(Builder $query, string $sort = '')
    {
        $sortables = data_get($this, 'sortables', Schema::getColumnListing(($this->getTable())));

        $sort = $sort ?? request()->get('sort');

        $order = request()->get('order', 'desc');

        if (
            $sort && in_array($sort, $sortables) &&
            $order && in_array($order, ['asc', 'desc'])
        ) return $query->orderBy($sort, $order);

        return $query;
    }
}
