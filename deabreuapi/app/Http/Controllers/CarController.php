<?php

namespace App\Http\Controllers;

use App\Http\Requests\CarRequest;
use App\Http\Resources\CarResource;
use App\Models\Car;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class CarController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/cars",
     *     summary="List all cars",
     *     @OA\Response(
     *         response=200,
     *         description="A list with cars"
     *     )
     * )
     */

    public function index()
    {
        return CarResource::collection(Car::all());
    }

    /**
     * @OA\Get(
     *     path="/api/cars/{id}",
     *     summary="Get a car by ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="A car object"
     *     )
     * )
     */

    /**
     * Retorna um carro específico por ID.
     */
    public function show($id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Carro não encontrado'], Response::HTTP_NOT_FOUND);
        }

        return new CarResource($car);
    }

    /**
     * Cria um novo carro.
     */
    public function store(CarRequest $request)
    {
        // Armazena as imagens
        $imagePaths = [];
        foreach ($request->file('images') as $image) {
            $imagePaths[] = $image->store('cars', 'public');
        }

        // Cria o carro
        $car = Car::create([
            'name' => $request->name,
            'brand_id' => $request->brand_id,
            'anoModelo' => $request->anoModelo,
            'cor' => $request->cor,
            'portas' => $request->portas,
            'images' => json_encode($imagePaths),
            'price' => $request->price,
            'miles' => $request->miles,
            'fuel' => $request->fuel,
            'transmission' => $request->transmission,
            'label' => $request->label,
            'tipo' => $request->tipo,
        ]);

        return new CarResource($car);
    }

    /**
     * Atualiza um carro existente.
     */
    public function update(CarRequest $request, $id)
    {
        $car = Car::find($id);
        if (!$car) {
            return response()->json(['message' => 'Carro não encontrado'], Response::HTTP_NOT_FOUND);
        }

        // Atualiza imagens, se fornecidas
        $imagePaths = json_decode($car->images, true);
        if ($request->hasFile('images')) {
            foreach ($imagePaths as $path) {
                Storage::disk('public')->delete($path);
            }
            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('cars', 'public');
            }
        }

        $car->update([
            'name' => $request->input('name', $car->name),
            'brand_id' => $request->input('brand_id', $car->brand_id),
            'anoModelo' => $request->input('anoModelo', $car->anoModelo),
            'cor' => $request->input('cor', $car->cor),
            'portas' => $request->input('portas', $car->portas),
            'images' => json_encode($imagePaths),
            'price' => $request->input('price', $car->price),
            'miles' => $request->input('miles', $car->miles),
            'fuel' => $request->input('fuel', $car->fuel),
            'transmission' => $request->input('transmission', $car->transmission),
            'label' => $request->input('label', $car->label),
            'tipo' => $request->input('tipo', $car->tipo),
            'sold' => $request->input('sold', $car->sold),
        ]);

        return new CarResource($car);
    }

    /**
     * Deleta um carro.
     */
    public function destroy($id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Carro não encontrado'], Response::HTTP_NOT_FOUND);
        }

        // Remove as imagens associadas
        $imagePaths = json_decode($car->images, true);
        foreach ($imagePaths as $path) {
            Storage::disk('public')->delete($path);
        }

        $car->delete();

        return response()->json(['message' => 'Carro deletado com sucesso'], Response::HTTP_OK);
    }

    /**
     * Lista todos os carros vendidos.
     */
    public function soldCars()
    {
        $soldCars = Car::where('sold', true)->get();
        return CarResource::collection($soldCars);
    }

    /**
     * Lista todos os carros não vendidos.
     */
    public function availableCars()
    {
        $availableCars = Car::where('sold', false)->get();
        return CarResource::collection($availableCars);
    }

    /**
     * Marca um carro como vendido ou não vendido.
     */
    public function markAsSold(Request $request, $id)
    {
        $car = Car::find($id);
        if (!$car) {
            return response()->json(['message' => 'Carro não encontrado'], Response::HTTP_NOT_FOUND);
        }

        $car->sold = $request->input('sold', true);
        $car->save();

        return new CarResource($car);
    }
}
