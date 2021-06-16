<?php

namespace App\Agents;

use Illuminate\Support\Str;
use Symfony\Component\Intl\Currencies;

class CDKeysAgent extends BaseAgent implements Agent
{
    /**
     * The headers that need to be sent with a request.
     */
    protected const HEADERS = [
        'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
        'Cookie' => 'PHPSESSID=mtav6u6afgfr2hrea6mbeloi7u'
    ];

    /**
     * The HTML exact path of the price meta element.
     */
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

    /**
     * Get the HTML element containing the price.
     * 
     * @param  \Symfony\Component\Panther\Client  $browser
     */
    protected function filterPriceElement($browser): \Symfony\Component\DomCrawler\Crawler
    {
        return $browser->getCrawler()->filterXPath(self::PRICE_X_PATH);
    }

    /**
     * Get the HTML element containing the price.
     * 
     * @param  \Symfony\Component\Panther\Client  $browser
     */
    public function setCurrency($browser, string $currency = 'USD'): void
    {
        $crawler = $browser->waitFor('body');

        $switcher = $crawler->selectLink($this->getCurrencyAttribute($currency));

        if (!$switcher->count()) return;

        $classes = '.' . Str::replace(' ', '.', $switcher->parents()->attr('class'));

        $browser->executeScript("document.querySelector('{$classes} > a').click()");

        $browser->reload();
    }

    /**
     * Prefix symbol with its respective symbol.
     */
    public function getCurrencyAttribute(string $currency): string
    {
        $capitalized =  strtoupper($currency);

        return Currencies::getSymbol($capitalized) . ' ' . $capitalized;
    }
}
