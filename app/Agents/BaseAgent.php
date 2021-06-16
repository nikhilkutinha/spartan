<?php

namespace App\Agents;

use Symfony\Component\DomCrawler\Crawler;
use Illuminate\Support\Facades\Http;
use Symfony\Component\Panther\Client;

abstract class BaseAgent implements Agent
{
    /**
     * The product URL. 
     */
    protected string $url;

    /**
     * The headers that need to be sent with a request.
     */
    protected const HEADERS = [
        'Accept-Language' => 'en-US,en;q=0.9',
        'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
    ];

    /**
     * The chrome driver arguments.
     */
    protected const CHROME_ARGUMENTS = ['--disable-blink-features=AutomationControlled'];

    /**
     * Create a new base agent instance.
     * 
     * @param  \Symfony\Component\DomCrawler\Crawler  $crawler
     */
    public function __construct(Crawler $crawler)
    {
        $this->crawler = $crawler;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Fluent method to make HTTP requests.
     */
    protected function http() : \Illuminate\Http\Client\PendingRequest
    {
        return Http::withHeaders(self::HEADERS);
    }

    /**
     * Create a new panther client instance.
     */
    protected function createPantherClient() : \Symfony\Component\Panther\Client
    {
        return Client::createChromeClient(null, self::CHROME_ARGUMENTS);
    }
}
