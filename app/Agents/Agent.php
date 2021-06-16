<?php

namespace App\Agents;

interface Agent
{
    /**
     * Set the url to be processed.
     */
    public function setUrl(string $url): self;

    /**
     * Attempt to get the lowest price of the product.
     */
    public function getPrice(): ?float;
}
