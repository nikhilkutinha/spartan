<?php

namespace App\Agents;

use Symfony\Component\Panther\Client;
use Symfony\Component\DomCrawler\Crawler;

class GamivoAgent extends BaseAgent implements Agent
{
    /**
     * The HTML exact path of the schema element.
     */
    protected const PRICE_X_PATH = '//*[@class="low-price"]';

    public function getPrice(): ?float
    {
        $browser = $this->createPantherClient();

        $browser->request('GET', $this->url);

        $this->setCurrency($browser);

        $priceElement = $this->filterPriceElement($browser);

        if (!$priceElement->count()) return null;

        return $this->removeCurrencyPrefix($priceElement->text());
    }

    /**
     * Set prefered currency on Gamivo.
     * 
     * @param  \Symfony\Component\Panther\Client  $browser
     */
    protected function setCurrency($browser, string $currency = 'USD')
    {
        $browser->executeScript("window.localStorage.setItem('currency_code', '{$currency}')");

        $browser->reload();
    }

    /**
     * Remove the currency symbol prefix from a price tag.
     */
    protected function removeCurrencyPrefix(string $price): string
    {
        return explode(' ', $price)[1];
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
}
