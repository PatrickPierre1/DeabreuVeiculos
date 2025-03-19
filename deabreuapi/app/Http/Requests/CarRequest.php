<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CarRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [
            'name' => 'required|string|max:255',
            'brand_id' => 'required|exists:brands,id',
            'anoModelo' => 'required|integer|digits:4',
            'cor' => 'required|string|max:50',
            'portas' => 'required|integer',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'price' => 'required|numeric',
            'miles' => 'required|string|max:255',
            'fuel' => 'required|string|max:50',
            'transmission' => 'required|string|max:50',
            'label' => 'required|string|max:255',
            'tipo' => 'required|string|max:50',
        ];

        if ($this->isMethod('patch') || $this->isMethod('put')) {
            foreach ($rules as $key => $rule) {
                $rules[$key] = str_replace('required|', '', $rule);
            }
        }

        return $rules;
    }
}
