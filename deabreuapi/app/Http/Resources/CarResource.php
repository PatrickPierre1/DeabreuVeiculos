<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'brand' => $this->brand ? $this->brand->name : null,
            'brand_id' => $this->brand_id,
            'anoModelo' => $this->anoModelo,
            'cor' => $this->cor,
            'portas' => $this->portas,
            'images' => json_decode($this->images),
            'price' => $this->price,
            'miles' => $this->miles,
            'fuel' => $this->fuel,
            'transmission' => $this->transmission,
            'label' => $this->label,
            'tipo' => $this->tipo,
            'logo' => $this->brand && $this->brand->logo ? $this->brand->logo : null,
            'sold' => $this->sold,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
