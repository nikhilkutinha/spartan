<?php

namespace App;

use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use MarcReichel\IGDBLaravel\Models\Company;
use MarcReichel\IGDBLaravel\Models\Game;

class IGDB
{
    protected string $url;

    public function __construct(string $url)
    {
        $this->url = $url;
    }

    public static function url(string $url): self
    {
        return new self($url);
    }

    public function gatherInformation(): ?array
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

        if (! $game) return null;

        return array_merge(
            collect($game)->only([
                'name',
                'summary',
                'first_release_date',
            ])->toArray(),

            $this->getRelatedInformation($game->relations)
        );
    }

    protected function getSlug(string $url): string
    {
        return Str::of($url)
            ->match('/(?<=igdb.com\/games\/)([\w\d-]+)(?=\/?)/');
    }

    protected function getInvolvedCompanies(array $involved): Collection
    {
        return collect($involved)->map(function ($participant) {
            $company =  Company::where('changed_company_id', $participant->company)->first();

            return $company->name;
        });
    }

    protected function resizeImageUrl(string $url, string $preset = 't_1080p'): string
    {
        if (! $url) return '';

        return 'https:' . Str::replace('t_thumb', $preset, $url);
    }

    protected function getRelatedInformation(Collection $items): array
    {
        $cover = $this->resizeImageUrl($items['cover']['url'] ?? '');

        $screenshot = $this->resizeImageUrl($items['screenshots']->last()['url'] ?? '');

        $platforms = $items['platforms']->map(function ($platform) {
            return $platform['abbreviation'];
        });

        $genres = $items['genres']->map(function ($platform) {
            return $platform['name'];
        });

        return compact('platforms', 'cover', 'screenshot', 'genres');
    }
}
