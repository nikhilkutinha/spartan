<?php

namespace App\Console\Commands;

use App\Models\Offer;
use Illuminate\Console\Command;

class OfferSynchronizerCommand extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'offers:sync {--force}';

    /**
     * The console command description.
     */
    protected $description = 'Synchronizing offers in database.';

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

        Offer::with('vendor')
            ->when(!$this->option('force'), fn ($query) => $query->withinThreshold())
            ->latest()
            ->each(function ($offer) {
                $offer->sync();
            });

        $this->info('Completed!');

        return 0;
    }
}
