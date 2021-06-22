<?php

namespace App\Console\Commands;

use App\Models\Offer;
use Illuminate\Console\Command;

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

        $this->startProgressBar(Offer::count());

        Offer::with('vendor')
            ->latest()
            ->withinSyncThreshold()
            ->each(function ($offer) {
                $offer->sync();

                $this->advanceProgressBar();
            });

        $this->finishProgressBar();

        return 0;
    }

    protected function startProgressBar($max)
    {
        $this->output->progressStart($max);
    }

    protected function advanceProgressBar()
    {
        $this->output->progressAdvance();
    }

    protected function finishProgressBar()
    {
        $this->output->progressFinish();
    }
}
