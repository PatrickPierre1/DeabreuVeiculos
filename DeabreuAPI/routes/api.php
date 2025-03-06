<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});

// Rota pública para listar os carros
Route::get('cars', [CarController::class, 'index']);

// Rota pública para obter um carro por ID
Route::get('cars/{id}', [CarController::class, 'show']);

// Grupo de rotas que requerem autenticação
Route::middleware('auth:sanctum')->group(function () {

    // Rota para criar um novo carro
    Route::post('cars', [CarController::class, 'store']);

    // Rota para atualizar um carro existente
    Route::put('cars/{id}', [CarController::class, 'update']);

    // Rota para excluir um carro
    Route::delete('cars/{id}', [CarController::class, 'destroy']);
});
