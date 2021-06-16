<?php

namespace App\Factories;

use Illuminate\Support\Str;
// use Illuminate\Http\Resources\Json\JsonResource;

class ResourceFactory
{
    public static function make(string $name)
    {
        $class = "\\App\\Http\\Resources\\" . Str::of($name)->studly()->singular() . 'Resource';

        if ( class_exists( $class ) ) {
            return $class;
        }
    }
}