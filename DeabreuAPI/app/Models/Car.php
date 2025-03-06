<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = [
        'name',
        'marca',
        'logo',
        'anoModelo',
        'cor',
        'portas',
        'images', // Campo para armazenar imagens em formato JSON
        'price',
        'miles',
        'fuel',
        'transmission',
        'label',
        'tipo'
    ];

    // Caso queira que o campo 'images' seja convertido automaticamente para array, defina o atributo 'casts'
    protected $casts = [
        'images' => 'array', // Converte o campo 'images' para um array automaticamente
    ];
}
