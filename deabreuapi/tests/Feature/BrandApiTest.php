<?php

namespace Tests\Feature;

use App\Models\Brand;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;
use Illuminate\Support\Facades\Storage;

class BrandApiTest extends TestCase
{
    use RefreshDatabase;

    protected $headers;

    protected function setUp(): void {
        parent::setUp();

        // Criando um usuário e gerando um token de autenticação bearer token para o teste
        $user = \App\Models\User::factory()->create();
        $token = $user->createToken('test-token')->plainTextToken;

        $this->headers = [
            'Authorization' => "Bearer $token",
        ];
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function it_list_all_brands()
    {
        Brand::factory()->count(3)->create();

        $response = $this->getJson('/api/brands');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function it_shows_a_single_brand() {
        $brand = Brand::factory()->create();

        $response = $this->withHeaders($this->headers)->getJson('/api/brands/' . $brand->id);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'id' => $brand->id,
                'name' => $brand->name,
                'logo' => $brand->logo,
            ]);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function test_it_return_404_for_nonexistent_brand()
    {
        $response = $this->withHeaders($this->headers)->getJson('/api/brands/999');

        $response->assertStatus(404)
            ->assertJson([
                'message' => 'Marca não encontrada',
            ]);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function test_it_creates_a_brand()
    {
        Storage::fake('public');

        $data = [
            'name' => "Marca Teste",
            'logo' => UploadedFile::fake()->image('logo.jpg'),
        ];

        $response = $this->withHeaders($this->headers)
            ->postJson('/api/brands', $data);

        $response->assertStatus(201)
            ->assertJsonFragment(['name' => 'Marca Teste']);

        $this->assertFileExists(Storage::disk('public')->path($response->json('data.logo')));
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function test_it_updates_a_brand() {
        Storage::fake('public');

        $brand = Brand::factory()->create([
            'name' => 'Marca Antiga',
            'logo' => 'brands/old_logo.jpg',
        ]);

        $newLogo = UploadedFile::fake()->image('new_logo.jpg');

        $data = [
            'name' => 'Marca Atualizada',
            'logo' => $newLogo,
        ];

        $response = $this->withHeaders($this->headers)
            ->putJson('/api/brands/' . $brand->id, $data);

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Marca Atualizada']);

        $this->assertFileExists(Storage::disk('public')->path($response->json('data.logo')));

        Storage::assertMissing('brands/old_logo.jpg');
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function test_it_deletes_a_brand() {
        Storage::fake('public');

        $brand = Brand::factory()->create([
            'name' => 'Marca Para Deletar',
            'logo' => UploadedFile::fake()->image('logo.jpg')->store('brands', 'public'),
        ]);

        $response = $this->withHeaders($this->headers)
            ->deleteJson('/api/brands/' . $brand->id);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Marca deletada com sucesso',
            ]);

        $this->assertDatabaseMissing('brands', ['id' => $brand->id]);

        Storage::assertMissing($brand->logo);
    }
}
