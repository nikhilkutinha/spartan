<?php

namespace App\Observers;

use App\Models\History;
use App\Models\Offer;

class OfferObserver
{
    /**
     * The offer instance.
     */
    protected Offer $offer;

    public function created(Offer $offer)
    {
        $this->syncHistory($offer);
    }

    public function updated(Offer $offer)
    {
        $this->syncHistory($offer);
    }

    /**
     * Determine if the history should be updated or created.
     */
    protected function syncHistory($offer)
    {
        if (! $offer->current_price) return;

        $this->offer = $offer;

        $entryCreatedToday = $this->offer->history()
            ->createdToday()
            ->first();

        $entryCreatedToday ? $this->updateHistoricEntry($entryCreatedToday)
            : $this->createHistoricEntry($offer);
    }

    protected function createHistoricEntry()
    {
        History::create([
            'offer_id' => $this->offer->id,
            'price' => $this->offer->current_price,
        ]);
    }

    protected function updateHistoricEntry(History $history)
    {
        tap($this->offer->current_price, function ($price) use ($history) {
            if ($history->price < $price) return;

            $history->update(['price' => $price]);
        });
    }
}
