<?php

namespace App\Services;

use App\Agents\Agent;
use App\Models\Offer;
use App\Models\History;

class OfferSynchronizer
{
    protected const SYNC_THRESHOLD = 3600;

    /**
     * The agent instance.
     * 
     * @var \App\Agents\Agent
     */
    protected $agent;

    /**
     * The offer instance.
     * 
     * @var \App\Models\Offer
     */
    protected $offer;

    /**
     * Create a new offer synchronization service instance.
     * 
     * @param  \App\Agents\Agent  $agent
     */
    public function __construct(Agent $agent, Offer $offer)
    {
        $this->agent = $agent;
        $this->offer = $offer;
    }

    /**
     * Initiate the synchronization process.
     * 
     * @param  float  $price
     * @return void
     */
    public function sync()
    {
        if (!$this->withinThreshold()) return;

        $price = $this->agent->setUrl($this->offer->url)
            ->getPrice();

        if (! $price = round($price, 2)) return;

        $this->updateOffer($price);

        $entryCreatedToday = $this->offer->history()
            ->createdToday()
            ->first();

        $entryCreatedToday ? $this->updateHistoricEntry($entryCreatedToday, $price)
            : $this->createHistoricEntry($price);

        $this->offer->touch();
    }

    /**
     * Ensures offer wasn't updated recently.
     * 
     * @return bool
     */
    protected function withinThreshold()
    {
        if (! $this->offer->last_synced_at) return true;

        return $this->offer->last_synced_at->diffInSeconds(now()) > self::SYNC_THRESHOLD;          
    }

    /**
     * Create a new historic entry.
     * 
     * @param  float  $price
     * @return void
     */
    protected function createHistoricEntry(float $price)
    {
        History::create([
            'offer_id' => $this->offer->id,
            'price' => $price,
        ]);
    }

    /**
     * Update historic entry if a lower price was found.
     * 
     * @param  \App\Models\History  $entry
     * @param  float  $price
     * @return void
     */
    protected function updateHistoricEntry(History $entry, float $price)
    {
        if ($entry->price < $price) return;

        $entry->update([
            'price' => $price
        ]);
    }

    /**
     * Update offer if price has changed.
     * 
     * @param  float  $price
     * @return void
     */
    protected function updateOffer(float $price)
    {
        if ($this->offer->current_price == $price) return;

        $this->offer->update([
            'current_price' => $price,
        ]);
    }
}
