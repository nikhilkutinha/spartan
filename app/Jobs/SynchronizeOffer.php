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
        $this->getPrice();
        $this->updateOffer();
    }

    protected function updateOffer()
    {
        if (!$this->price) return;

        if ($this->offer->current_price == $this->price) return;

        $this->offer->update([
            'current_price' => $this->price,
        ]);
    }

    protected function getPrice()
    {
        $this->price = $this->agent->setUrl($this->offer->url)
            ->getPrice();
    }
}
