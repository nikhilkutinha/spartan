<?php

namespace App\Services;

use App\Agents\Agent;
use App\Models\Offer;
use Illuminate\Queue\SerializesModels;
use App\Notifications\ImportantStockUpdate;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldQueue;

class SynchronizeOffer implements ShouldQueue
{
    protected const SYNC_THRESHOLD = 3600;

    protected Agent $agent;

    protected Offer $offer;

    public function __construct(Agent $agent, Offer $offer)
    {
        $this->agent = $agent;
        $this->offer = $offer;
    }

    public function handle()
    {
        if (! $this->withinThreshold()) return;

        $price = $this->agent->setUrl($this->offer->url)
                             ->getPrice();

        if ($price) $this->updateOffer(round($price, 2));        
    }

    protected function withinThreshold()
    {
        if (!$this->offer->last_synced_at) return true;

        return $this->offer->last_synced_at->diffInSeconds(now()) > self::SYNC_THRESHOLD;
    }

    protected function updateOffer(float $price)
    {
        if ($this->offer->current_price == $price) return;

        $this->offer->update([
            'current_price' => $price,
        ]);
    }
}
