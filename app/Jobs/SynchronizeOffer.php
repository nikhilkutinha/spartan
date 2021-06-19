<?php

namespace App\Jobs;

use App\Agents\Agent;
use App\Models\Offer;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SynchronizeOffer implements ShouldQueue
{
    use Dispatchable,
        InteractsWithQueue,
        Queueable,
        SerializesModels;

    protected Agent $agent;

    protected Offer $offer;

    public function __construct(Offer $offer, Agent $agent)
    {
        $this->offer = $offer;
        $this->agent = $agent;
    }

    public function handle()
    {
        $price = $this->agent->setUrl($this->offer->url)
            ->getPrice();

        if ($price) $this->updateOffer($price);
    }

    protected function updateOffer(float $price)
    {
        if ($this->offer->current_price == $price) return;

        $this->offer->update([
            'current_price' => $price,
        ]);
    }
}
