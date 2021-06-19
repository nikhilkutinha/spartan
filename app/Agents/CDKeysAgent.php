<?php

namespace App\Agents;

use Illuminate\Support\Str;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\Intl\Currencies;
use Symfony\Component\Panther\Client;

class CDKeysAgent extends BaseAgent implements Agent
{
    protected const PRICE_X_PATH = "//meta[@property='product:price:amount']";

    public function getPrice(): ?float
    {
        $browser = $this->createPantherClient();

        $browser->request('GET', $this->url);

        $this->setCurrency($browser);

        $priceElement = $this->filterPriceElement($browser);

        if (!$priceElement->count()) return null;

        return $priceElement->attr('content');
    }

    protected function filterPriceElement(Client $browser): Crawler
    {
        return $browser->getCrawler()->filterXPath(self::PRICE_X_PATH);
    }

    public function setCurrency(Client $browser, string $currency = 'USD')
    {
        $crawler = $browser->waitFor('body');

        $switcher = $crawler->selectLink($this->getCurrencyAttribute($currency));

        if (!$switcher->count()) return null;

        $classes = '.' . Str::replace(' ', '.', $switcher->parents()->attr('class'));

        $browser->executeScript("document.querySelector('{$classes} > a').click()");

        $browser->reload();
    }

    public function getCurrencyAttribute(string $currency): string
    {
        $capitalized = strtoupper($currency);

        return Currencies::getSymbol($capitalized) . ' ' . $capitalized;
    }
}
