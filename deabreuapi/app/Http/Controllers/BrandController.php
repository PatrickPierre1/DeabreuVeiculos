<?php
// app/Http/Controllers/BrandController.php

namespace App\Http\Controllers;

use App\Http\Requests\BrandRequest;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class BrandController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/brands",
     *     summary="List all brands",
     *     @OA\Response(
     *         response=200,
     *         description="A list with brands"
     *     )
     * )
     */
    
    public function index()
    {
        return BrandResource::collection(Brand::all());
    }

    /**
     * Retorna uma marca específica por ID.
     */
    public function show($id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json(['message' => 'Marca não encontrada'], Response::HTTP_NOT_FOUND);
        }

        return new BrandResource($brand);
    }

    /**
     * Cria uma nova marca.
     */
    public function store(BrandRequest $request)
    {
        // Armazena a logo, se fornecida
        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('brands', 'public');
        }

        // Cria a marca
        $brand = Brand::create([
            'name' => $request->name,
            'logo' => $logoPath,
        ]);

        return new BrandResource($brand);
    }

    /**
     * Atualiza uma marca existente.
     */
    public function update(BrandRequest $request, $id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json(['message' => 'Marca não encontrada'], Response::HTTP_NOT_FOUND);
        }

        // Atualiza a logo, se fornecida
        if ($request->hasFile('logo')) {
            // Remove logo anterior
            if ($brand->logo) {
                Storage::disk('public')->delete($brand->logo);
            }
            $logoPath = $request->file('logo')->store('brands', 'public');
        }

        // Atualiza os dados da marca
        $brand->update([
            'name' => $request->name,
            'logo' => isset($logoPath) ? $logoPath : $brand->logo,
        ]);

        return new BrandResource($brand);
    }

    /**
     * Deleta uma marca.
     */
    public function destroy($id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json(['message' => 'Marca não encontrada'], Response::HTTP_NOT_FOUND);
        }

        // Remove a logo associada
        if ($brand->logo) {
            Storage::disk('public')->delete($brand->logo);
        }

        $brand->delete();

        return response()->json(['message' => 'Marca deletada com sucesso'], Response::HTTP_OK);
    }
}
