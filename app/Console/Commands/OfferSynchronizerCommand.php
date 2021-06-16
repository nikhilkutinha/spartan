<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Offer;
use App\Agents\Agent;
use App\Services\OfferSynchronizer;

class OfferSynchronizerCommand extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'offers:sync';

    /**
     * The console command description.
     */
    protected $description = 'Synchronize offer prices in our database.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     * 
     * @return int
     */
    public function handle()
    {
        $this->info('Syncing offers in database.');

        $app = app();

        Offer::with('vendor')->orderBy('created_at', 'desc')->each(function ($offer) use ($app) {
            $app->bind(Offer::class, function () use ($offer) {
                return $offer;
            });

            $app->bind(Agent::class, $offer->vendor->agent);

            $app->make(OfferSynchronizer::class)->sync($offer);
        });

        return 0;
    }
}
