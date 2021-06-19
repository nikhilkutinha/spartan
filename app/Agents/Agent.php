<?php

namespace App\Agents;

interface Agent
{
    /**
     * Set the URL to be opened.
     */
    public function setUrl(string $url): self;

    /**
     * Get the final price of the product.
     */
    public function getPrice(): ?float;
}
