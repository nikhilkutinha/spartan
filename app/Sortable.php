<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Schema;

trait Sortable
{
    public function scopeSort(Builder $query, string $sort = ''): Builder
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
