<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;

class CarController extends Controller
{
    public function index()
    {
        // Obtém todos os carros do banco de dados
        $cars = Car::all();

        // Retorna todos os carros em formato JSON
        return response()->json($cars, Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        // Validações
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
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
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Armazenar o logo
        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('logos', 'public'); // 'logos' é a pasta onde os logos serão armazenados
        }

        // Armazenar as imagens
        $imagePaths = [];
        foreach ($request->file('images') as $image) {
            $imagePath = $image->store('cars', 'public'); // 'cars' é a pasta onde as imagens serão armazenadas
            $imagePaths[] = $imagePath;
        }

        // Criar o carro e salvar o caminho das imagens no banco
        $car = Car::create([
            'name' => $request->name,
            'marca' => $request->marca,
            'logo' => $logoPath, // Caminho do logo
            'anoModelo' => $request->anoModelo,
            'cor' => $request->cor,
            'portas' => $request->portas,
            'images' => json_encode($imagePaths), // Armazenar as imagens no formato JSON
            'price' => $request->price,
            'miles' => $request->miles,
            'fuel' => $request->fuel,
            'transmission' => $request->transmission,
            'label' => $request->label,
            'tipo' => $request->tipo,
        ]);

        return response()->json($car, 201);
    }

    public function update(Request $request, $id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Carro não encontrado'], 404);
        }

        // Validações
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'marca' => 'string|max:255',
            'logo' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'anoModelo' => 'integer|digits:4',
            'cor' => 'string|max:50',
            'portas' => 'integer',
            'images' => 'array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'price' => 'numeric',
            'miles' => 'string|max:255',
            'fuel' => 'string|max:50',
            'transmission' => 'string|max:50',
            'label' => 'string|max:255',
            'tipo' => 'string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Armazenar as novas imagens, caso existam
        $imagePaths = json_decode($car->images, true); // Carregar as imagens já existentes
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imagePath = $image->store('cars', 'public'); // 'cars' é a pasta onde as imagens serão armazenadas
                $imagePaths[] = $imagePath;
            }
        }

        // Armazenar o logo, caso exista
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('logos', 'public'); // 'logos' é a pasta onde os logos serão armazenados
            $car->logo = $logoPath;
        }

        // Atualizar o carro
        $car->update([
            'name' => $request->name ?? $car->name,
            'marca' => $request->marca ?? $car->marca,
            'logo' => $car->logo,
            'anoModelo' => $request->anoModelo ?? $car->anoModelo,
            'cor' => $request->cor ?? $car->cor,
            'portas' => $request->portas ?? $car->portas,
            'images' => json_encode($imagePaths), // Atualizar as imagens no formato JSON
            'price' => $request->price ?? $car->price,
            'miles' => $request->miles ?? $car->miles,
            'fuel' => $request->fuel ?? $car->fuel,
            'transmission' => $request->transmission ?? $car->transmission,
            'label' => $request->label ?? $car->label,
            'tipo' => $request->tipo ?? $car->tipo,
        ]);

        return response()->json($car);
    }

    public function show($id)
    {
        // Tenta encontrar o carro pelo ID
        $car = Car::find($id);

        // Se não encontrar, retorna um erro 404
        if (!$car) {
            return response()->json([
                'message' => 'Carro não encontrado'
            ], Response::HTTP_NOT_FOUND);
        }

        // Caso encontre o carro, retorna os dados do carro
        return response()->json($car, Response::HTTP_OK);
    }

    public function destroy($id)
    {
        // Encontrar o carro no banco de dados
        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Carro não encontrado'], 404);
        }

        // Excluir as imagens associadas ao carro
        $images = json_decode($car->images, true); // Decodificando o JSON das imagens
        foreach ($images as $image) {
            // Remover cada imagem da pasta de storage
            Storage::disk('public')->delete($image);
        }

        // Excluir o logo
        if ($car->logo) {
            Storage::disk('public')->delete($car->logo);
        }

        // Excluir o carro do banco de dados
        $car->delete();

        return response()->json(['message' => 'Carro excluído com sucesso']);
    }
}
