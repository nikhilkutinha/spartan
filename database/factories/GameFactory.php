<?php

namespace Database\Factories;

use App\Models\Game;
use Illuminate\Database\Eloquent\Factories\Factory;

class GameFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Game::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->text(),
            'released_on' => $this->faker->date(),
            'poster_path' => $this->faker->imageUrl(600, 900),
            'backdrop_path' => $this->faker->imageUrl(1920, 1080),
        ];
    }
}
