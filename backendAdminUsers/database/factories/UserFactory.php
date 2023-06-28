<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nombre' => $this->faker->name(),
            'apellidos' => $this->faker->lastName(),
            'correo' => $this->faker->safeEmail(),
            'contrasena' => '123456', // password
            'rol' => 1,
        ];
    }

}
