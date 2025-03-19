import { NextResponse } from "next/server";

const cars = [
    {
        id: 1,
        name: "Toyota Camry New",
        marca: "Toyota",
        logo: "/logos/toyota.png",
        anoModelo: 2023,
        cor: "Prata",
        portas: 4,
        images: [
            "/images/camry.jpg",
            "/images/camry.jpg",
            "/images/camry.jpg",
            "/images/camry.jpg",
            "/images/camry.jpg",
        ],
        price: "R$ 40.999,00",
        miles: "20.000km",
        fuel: "Flex",
        transmission: "Automático",
        label: "Ótimo Preço",
        tipo: "Sedan",
    },
    {
        id: 2,
        name: "Volkswagen T-Cross 2023",
        marca: "Volkswagen",
        logo: "/logos/volkswagen.png",
        anoModelo: 2023,
        cor: "Branco",
        portas: 4,
        images: [
            "/images/tcross.jpg",
            "/images/tcross.jpg",
            "/images/tcross.jpg",
            "/images/tcross.jpg",
            "/images/tcross.jpg",
        ],
        price: "R$ 99.500,00",
        miles: "10.000km",
        fuel: "Gasolina",
        transmission: "Automático",
        label: "Oferta Especial",
        tipo: "SUV",
    },
    {
        id: 3,
        name: "Honda Civic 2022",
        marca: "Honda",
        logo: "/logos/honda.png",
        anoModelo: 2022,
        cor: "Cinza",
        portas: 4,
        images: [
            "/images/hondacivic2022.jpg",
            "/images/hondacivic2022.jpg",
            "/images/hondacivic2022.jpg",
            "/images/hondacivic2022.jpg",
            "/images/hondacivic2022.jpg",
        ],
        price: "R$ 115.990,00",
        miles: "5.000km",
        fuel: "Híbrido",
        transmission: "CVT",
        label: "Destaque",
        tipo: "Sedan",
    },
    {
        id: 4,
        name: "Ford Mustang GT",
        marca: "Ford",
        logo: "/logos/ford.png",
        anoModelo: 2024,
        cor: "Vermelho",
        portas: 2,
        images: [
            "/images/fordmustanggt.jpg",
            "/images/fordmustanggt.jpg",
            "/images/fordmustanggt.jpg",
            "/images/fordmustanggt.jpg",
            "/images/fordmustanggt.jpg",
        ],
        price: "R$ 350.000,00",
        miles: "0km",
        fuel: "V8 Gasolina",
        transmission: "Manual",
        label: "Alta Performance",
        tipo: "Coupé",
    },
    {
        id: 5,
        name: "Chevrolet Onix LTZ 2023",
        marca: "Chevrolet",
        logo: "/logos/chevrolet.png",
        anoModelo: 2023,
        cor: "Azul",
        portas: 4,
        images: [
            "/images/onix.jpg",
            "/images/onix.jpg",
            "/images/onix.jpg",
            "/images/onix.jpg",
            "/images/onix.jpg",
        ],
        price: "R$ 78.900,00",
        miles: "15.000km",
        fuel: "Flex",
        transmission: "Automático",
        label: "Mais Vendido",
        tipo: "Hatchback",
    },
    {
        id: 6,
        name: "BMW Série 3 2023",
        marca: "BMW",
        logo: "/logos/bmw.png",
        anoModelo: 2023,
        cor: "Preto",
        portas: 4,
        images: [
            "/images/bmwserie3.jpg",
            "/images/bmwserie3.jpg",
            "/images/bmwserie3.jpg",
            "/images/bmwserie3.jpg",
            "/images/bmwserie3.jpg",
        ],
        price: "R$ 215.000,00",
        miles: "8.000km",
        fuel: "Gasolina",
        transmission: "Automático",
        label: "Luxo",
        tipo: "Sedan",
    },
    {
        id: 7,
        name: "Audi Q5 2022",
        marca: "Audi",
        logo: "/logos/audi.png",
        anoModelo: 2022,
        cor: "Branco",
        portas: 4,
        images: [
            "/images/audiq5.jpg",
            "/images/audiq5.jpg",
            "/images/audiq5.jpg",
            "/images/audiq5.jpg",
            "/images/audiq5.jpg",
        ],
        price: "R$ 290.000,00",
        miles: "12.000km",
        fuel: "Diesel",
        transmission: "Automático",
        label: "SUV Premium",
        tipo: "SUV",
    },
    {
        id: 8,
        name: "Jeep Compass 2023",
        marca: "Jeep",
        logo: "/logos/jeep.png",
        anoModelo: 2023,
        cor: "Verde",
        portas: 4,
        images: [
            "/images/jeepcompass.jpg",
            "/images/jeepcompass.jpg",
            "/images/jeepcompass.jpg",
            "/images/jeepcompass.jpg",
            "/images/jeepcompass.jpg",
        ],
        price: "R$ 140.000,00",
        miles: "10.000km",
        fuel: "Flex",
        transmission: "Automático",
        label: "Aventura",
        tipo: "SUV",
    },
    {
        id: 9,
        name: "Mercedes-Benz Classe C 2023",
        marca: "Mercedes-Benz",
        logo: "/logos/mercedes-benz.png",
        anoModelo: 2023,
        cor: "Cinza",
        portas: 4,
        images: [
            "/images/mercedesbenzcclass.jpg",
            "/images/mercedesbenzcclass.jpg",
            "/images/mercedesbenzcclass.jpg",
            "/images/mercedesbenzcclass.jpg",
            "/images/mercedesbenzcclass.jpg",
        ],
        price: "R$ 300.000,00",
        miles: "5.000km",
        fuel: "Gasolina",
        transmission: "Automático",
        label: "Elegância",
        tipo: "Sedan",
    },
    {
        id: 10,
        name: "Nissan Kicks 2023",
        marca: "Nissan",
        logo: "/logos/nissan.png",
        anoModelo: 2023,
        cor: "Laranja",
        portas: 4,
        images: [
            "/images/nissankicks.jpg",
            "/images/nissankicks.jpg",
            "/images/nissankicks.jpg",
            "/images/nissankicks.jpg",
            "/images/nissankicks.jpg",
        ],
        price: "R$ 95.000,00",
        miles: "7.000km",
        fuel: "Flex",
        transmission: "Automático",
        label: "Compacto",
        tipo: "SUV",
    },
    {
        id: 11,
        name: "Toyota Hilux TURBO DIESEL CD SR",
        marca: "Toyota",
        logo: "/logos/toyota.png",
        anoModelo: 2023,
        cor: "Branca",
        portas: 4,
        images: [
            "/images/hilux1.jpeg",
            "/images/hilux2.jpeg",
            "/images/hilux3.jpeg",
            "/images/hilux4.jpeg",
            "/images/hilux5.jpeg",
        ],
        price: "R$ 236.900,00",
        miles: "34421km",
        fuel: "Diesel",
        transmission: "Automático",
        label: "Pouca km",
        tipo: "Picape",
    },
    {
        id: 12,
        name: "Chevrolet Vectra GT",
        marca: "Chevrolet",
        logo: "/logos/chevrolet.png",
        anoModelo: 2010,
        cor: "Vermelho",
        portas: 4,
        images: [
            "/images/vectra1.jpg",
            "/images/vectra2.jpg",
            "/images/vectra3.jpg",
            "/images/vectra4.jpg",
            "/images/vectra5.jpg",
            "/images/vectra5.jpg",
            "/images/vectra5.jpg",
            "/images/vectra5.jpg",
        ],
        price: "R$ 32.000,00",
        miles: "200.000km",
        fuel: "Flex",
        transmission: "Automático",
        label: "Melhor de umuarama",
        tipo: "Hatchback",
    },
];

export async function GET(req: any) {
    const { searchParams } = new URL(req.url);
    const idFilter = searchParams.get("id");
    const nameFilter = searchParams.get("name")?.toLowerCase();
    const marcaFilter = searchParams.get("marca")?.toLowerCase();
    const tipoFilter = searchParams.get("tipo")?.toLowerCase();
    const anoModeloFilter = searchParams.get("anoModelo");

    let filteredCars = cars;

    if (idFilter) {
        const car = cars.find((car) => car.id === parseInt(idFilter));
        return car
            ? NextResponse.json(car)
            : NextResponse.json(
                  { message: "Carro não encontrado" },
                  { status: 404 }
              );
    }

    if (nameFilter) {
        filteredCars = filteredCars.filter((car) =>
            car.name.toLowerCase().includes(nameFilter)
        );
    }

    if (marcaFilter) {
        filteredCars = filteredCars.filter(
            (car) => car.marca.toLowerCase() === marcaFilter
        );
    }

    if (tipoFilter) {
        filteredCars = filteredCars.filter(
            (car) => car.tipo.toLowerCase() === tipoFilter
        );
    }

    if (anoModeloFilter) {
        filteredCars = filteredCars.filter(
            (car) => car.anoModelo.toString() === anoModeloFilter
        );
    }

    return NextResponse.json(filteredCars);
}
