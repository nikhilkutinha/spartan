<?php

namespace App\Agents;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\Panther\Client;

abstract class BaseAgent implements Agent
{
    /**
     * The URL to be opened.
     */
    protected string $url;

    /**
     * The headers to be sent during a HTTP request.
     */
    protected const HEADERS = [
        'Accept-Language' => 'en-US,en;q=0.9',
        'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
    ];

    /**
     * The arguments to be passed into the chrome driver.
     */
    protected const CHROME_ARGUMENTS = [
        '--disable-blink-features=AutomationControlled',
        '--log-level=3',
        '--headless',
        'User-Agent=' . self::HEADERS['User-Agent'],
    ];

    protected Crawler $crawler;

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
     * Fluent method to utilize laravel's HTTP client.
     */
    protected function http(): PendingRequest
    {
        return Http::withHeaders(self::HEADERS);
    }

    /**
     * Instantiate the panther client.
     */
    protected function createPantherClient(): Client
    {
        return Client::createChromeClient(null, self::CHROME_ARGUMENTS);
    }
}
