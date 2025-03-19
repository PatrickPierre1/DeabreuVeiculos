<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->dropColumn(['marca', 'logo']);

            $table->foreignId('brand_id')->constrained('brands')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->string('marca');
            $table->string('logo');

            $table->dropForeign(['brand_id']);
            $table->dropColumn('brand_id');
        });
    }
};
