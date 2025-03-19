<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = [
        'name',
        'brand_id',
        'anoModelo',
        'cor',
        'portas',
        'images', // Campo para armazenar imagens em formato JSON
        'price',
        'miles',
        'fuel',
        'transmission',
        'label',
        'tipo',
        'sold'
    ];

    // Caso queira que o campo 'images' seja convertido automaticamente para array, defina o atributo 'casts'
    protected $casts = [
        'images' => 'array', // Converte o campo 'images' para um array automaticamente
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
}
