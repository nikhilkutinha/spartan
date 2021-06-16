<?php

namespace App\Agents;

use Symfony\Component\Panther\Client;

class G2Agent extends BaseAgent implements Agent
{
    /**
     * The HTML exact path of the schema element.
     */
    protected const SCHEMA_X_PATH = '//*[@id="__schema.org"]';


    public function setUrl(string $url): self
    {
        $this->url = $this->prepareUrl($url);

        return $this;
    }

    /**
     * Prepare a new URL based on the prefered locale.
     */
    protected function prepareUrl(string $url, string $locale = 'en-us'): string
    {
        [
            'scheme' => $scheme,
            'host' => $host,
            'path' => $path
        ] = parse_url($url);

        if (str_starts_with($path, $locale)) return $url;

        return "{$scheme}://{$host}/{$locale}{$path}";
    }

    public function getPrice(): ?float
    {
        $browser = $this->createPantherClient();

        $browser->request('GET', $this->url);

        $priceElement = $this->filterPriceElement($browser);

        if (!$priceElement->count()) return null;

        return json_decode($priceElement->text())->offers->lowPrice;
    }

    /**
     * Get the HTML element containing the price.
     * 
     * @param  \Symfony\Component\Panther\Client  $browser
     */
    protected function filterPriceElement($browser): \Symfony\Component\DomCrawler\Crawler
    {
        $this->crawler->add($browser->getCrawler()->html());

        return $this->crawler->filterXPath(self::SCHEMA_X_PATH);
    }

    /**
     * Create a new panther client instance.
     */
    protected function createPantherClient(): \Symfony\Component\Panther\Client
    {
        return Client::createChromeClient(null, self::CHROME_ARGUMENTS);
    }
}
