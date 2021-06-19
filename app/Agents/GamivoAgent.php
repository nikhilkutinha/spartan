<?php

namespace App\Agents;

use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\Panther\Client;

class GamivoAgent extends BaseAgent implements Agent
{
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

    protected function setCurrency(Client $browser, string $currency = 'USD')
    {
        $browser->executeScript("window.localStorage.setItem('currency_code', '{$currency}')");

        $browser->reload();
    }

    protected function removeCurrencyPrefix(string $price): string
    {
        return explode(' ', $price)[1];
    }

    protected function filterPriceElement(Client $browser): Crawler
    {
        return $browser->getCrawler()->filterXPath(self::PRICE_X_PATH);
    }
}
