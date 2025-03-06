<?php
// database/migrations/[timestamp]_create_cars_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarsTable extends Migration
{
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('marca');
            $table->string('logo');
            $table->year('anoModelo');
            $table->string('cor');
            $table->integer('portas');
            $table->json('images');
            $table->decimal('price', 10, 2);
            $table->string('miles');
            $table->string('fuel');
            $table->string('transmission');
            $table->string('label');
            $table->string('tipo');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cars');
    }
}
