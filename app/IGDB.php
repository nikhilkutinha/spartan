<?php

namespace App;

use MarcReichel\IGDBLaravel\Models\Game;
use MarcReichel\IGDBLaravel\Models\Company;
use Illuminate\Support\Str;

class IGDB
{
    /**
     * The game URL. 
     * 
     * @var string
     */
    protected $url;

    public function __construct(string $url)
    {
        $this->url = $url;
    }

    /**
     * A fluent method to instantiate the class.
     *
     * @param  string  $url
     */
    public static function url(string $url): self
    {
        return new self($url);
    }

    /**
     * Get the finalized information.
     *
     * @param none
     * @return \Illuminate\Support\Collection|null
     */
    public function gatherInformation()
    {
        $slug = $this->getSlug($this->url);

        $game = Game::where('slug', $slug)
            ->with([
                'platforms' => ['abbreviation'],
                'cover' => ['url'],
                'screenshots' => ['url'],
                'involved_companies' => ['company'],
                'genres' => ['name'],
            ])
            ->first();

        if (!$game) return;

        return array_merge(
            collect($game)->only([
                'name',
                'summary',
                'first_release_date',
            ])->toArray(),

            $this->getRelatedInformation($game->relations)
        );
    }

    /**
     * Get the slug from the specified URL.
     *
     * @param  string  $url
     * @return string
     */
    protected function getSlug(string $url)
    {
        return Str::of($url)
            ->match('/(?<=igdb.com\/games\/)([\w\d-]+)(?=\/?)/');
    }

    /**
     * Get involved companies names.
     * 
     * @param  array|object  $involved
     * @return array
     */
    protected function getInvolvedCompanies($involved)
    {
        return collect($involved)->map(function ($participant) {
            $company =  Company::where('changed_company_id', $participant->company)->first();

            return $company->name;
        });
    }

    /**
     * Force the image url to return a higher resolution image.
     *
     * @param  string  $url
     * @return string
     */
    protected function resizeImageUrl(string $url, string $preset = 't_1080p')
    {
        return 'https:' . Str::replace('t_thumb', $preset, $url);
    }

    /**
     * Get the related attributes of the game.
     *
     * @param  Illuminate\Support\Collection  $items
     * @return array
     */
    protected function getRelatedInformation($items)
    {
        $cover = $this->resizeImageUrl($items['cover']['url']);
        $screenshot = $this->resizeImageUrl($items['screenshots']->last()['url']);

        $platforms = $items['platforms']->map(function ($platform) {
            return $platform['abbreviation'];
        });

        $genres = $items['genres']->map(function ($platform) {
            return $platform['name'];
        });

        return compact('platforms', 'cover', 'screenshot', 'genres');
    }
}
