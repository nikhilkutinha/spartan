<?php

namespace App\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class ModelFactory
{
    public static function make(string $name): Model
    {
        $class = "App\\Models\\" . Str::of($name)->studly()->singular();

        if ( class_exists( $class ) ) {
            return new $class();
        }
    }
}