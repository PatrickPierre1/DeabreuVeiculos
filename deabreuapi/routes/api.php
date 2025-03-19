<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\BrandController;
use Illuminate\Support\Facades\Route;

/**
 * @OA\Info(
 *     title="Deabreu Veiculos API",
 *     version="1.0.0",
 *     description="API documentation for Deabreu Veiculos"
 * )
 */

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/user', [AuthController::class, 'user']);

Route::get('cars', [CarController::class, 'index']);
Route::get('cars/{id}', [CarController::class, 'show']);
Route::get('/cars/sold', [CarController::class, 'soldCars']);
Route::get('/cars/available', [CarController::class, 'availableCars']);
Route::patch('/cars/{id}/sold', [CarController::class, 'markAsSold']);

Route::get('brands', [BrandController::class, 'index']);

Route::middleware(['auth:sanctum'])->group(function () {

    Route::apiResource('cars', CarController::class)->except(['index', 'show']);

    Route::apiResource('brands', BrandController::class)->except(['index']);
});

Route::get('/documentation', function () {
    return view('swagger.index');
});

Route::get('docs', '\L5Swagger\Http\Controllers\SwaggerController@api')->name('swagger.docs');
