"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Chip,
    Box,
    Grid,
    Container,
    TextField,
    InputAdornment,
    CircularProgress,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
    CardActionArea,
} from "@mui/material";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SpeedIcon from "@mui/icons-material/Speed";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import Grid2 from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import Slider from "react-slick";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Vehicle {
    id: number;
    name: string;
    marca: string
    tipo: string;
    logo: string;
    anoModelo: number;
    images: string[];
    price: string;
    miles: string;
    fuel: string;
    transmission: string;
    cor: string;
    portas: number;
    label: string;
}

const Types = [
    { name: "Sedan", logo: "/logos/tipos/sedan.png" },
    { name: "Hatchback", logo: "/logos/tipos/hatchback.png" },
    { name: "SUV", logo: "/logos/tipos/suv.png" },
    { name: "Picape", logo: "/logos/tipos/picapes.png" },
    { name: "Coupé", logo: "/logos/tipos/sedan.png" },
    { name: "Motos", logo: "/logos/tipos/motos.png" },
];

function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <ArrowForwardIosIcon
            className={className}
            style={{ ...style, display: "block", color: "#bbb", cursor: "pointer" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <ArrowBackIosNewIcon
            className={className}
            style={{ ...style, display: "block", color: "#bbb", cursor: "pointer" }}
            onClick={onClick}
        />
    );
}
export default function VehicleList() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [search, setSearch] = useState("");
    const [brands, setBrands] = useState<string[]>([]);
    const [selectedYear, setSelectedYear] = useState<string | number>("");
    const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/vehicles")
            .then((res) => res.json())
            .then((data: Vehicle[]) => {
                setVehicles(data);
                const uniqueBrands = Array.from(new Set(data.map((vehicle) => vehicle.marca)));
                setBrands(uniqueBrands);
                setFilteredVehicles(data);
                setIsLoading(false);
            });
    }, []);

    const handleBrandFilter = (brand: string) => {
        setIsLoading(true);
        const newBrand = brand === selectedBrand ? null : brand;
        setSelectedBrand(newBrand);
        filterVehicles(newBrand, selectedType);
        setIsLoading(false);
    };

    const handleTypeFilter = (type: string) => {
        setIsLoading(true);
        const newType = type === selectedType ? null : type;
        setSelectedType(newType);
        filterVehicles(selectedBrand, newType);
        setIsLoading(false);
    };

    const filterVehicles = (brand: string | null, type: string | null) => {
        let filtered = vehicles;
        if (brand) {
            filtered = filtered.filter(vehicle => vehicle.marca === brand);
        }
        if (type) {
            filtered = filtered.filter(vehicle => vehicle.tipo === type);
        }

        setFilteredVehicles(filtered);
    };

    useEffect(() => {
        filterVehicles(selectedBrand, selectedType);
    }, [selectedBrand, selectedType]);

    useEffect(() => {
        if (search === "" && selectedYear === "") {
            setFilteredVehicles(vehicles);
            return;
        }

        setIsLoading(true);
        const timeoutId = setTimeout(() => {
            const filtered = vehicles.filter((vehicle) => {
                const matchesSearch =
                    vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
                    vehicle.marca.toLowerCase().includes(search.toLowerCase());

                const matchesYear =
                    selectedYear === "" || vehicle.anoModelo === Number(selectedYear);

                return matchesSearch && matchesYear;
            });

            setFilteredVehicles(filtered);
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [search, selectedYear, vehicles]);

    useEffect(() => {
        const sortedVehicles = [...filteredVehicles].sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/[^\d.-]/g, ""));
            const priceB = parseFloat(b.price.replace(/[^\d.-]/g, ""));
            return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
        });

        if (JSON.stringify(sortedVehicles) !== JSON.stringify(filteredVehicles)) {
            setFilteredVehicles(sortedVehicles);
        }
    }, [sortOrder, filteredVehicles]);

    const availableYears = Array.from(
        new Set(vehicles.map((vehicle) => vehicle.anoModelo))
    );

    const handleSortOrderChange = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    const handleViewDetails = (id: number) => {
        router.push(`/veiculo/${id}`);
    };

    const settings2 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };

    return (
        <>
            <Container>
                <Box sx={{ p: 4 }}>
                    <Grid2 container justifyContent="center">
                        {Types.map((type) => (
                            <Grid2 key={type.name} size={{ xs: 6, sm: 4, md: 2 }}>
                                <Card
                                    sx={{
                                        textAlign: 'center',
                                        width: 138,
                                        border: selectedType === type.name ? '2px solid #3f51b5' : 'none',
                                        backgroundColor: selectedType === type.name ? '#e0e0e0' : 'transparent',
                                        transition: 'background-color 0.3s, border 0.3s',
                                    }}
                                >
                                    <CardActionArea onClick={() => handleTypeFilter(type.name)}>
                                        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <Box sx={{ height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <img
                                                    src={type.logo}
                                                    alt={type.name}
                                                    width={35}
                                                    height={35}
                                                    style={{ objectFit: "contain" }}
                                                />
                                            </Box>
                                            <Typography sx={{ mt: 1 }}>{type.name}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid2>
                        ))}
                    </Grid2>

                    <Box mt={5}>
                        <Slider {...settings2} className='.custom-slick-carousel'>
                            {brands.map((brand) => (
                                <div key={brand} style={{ textAlign: 'center', padding: '10px' }}>
                                    <Card
                                        sx={{
                                            textAlign: 'center',
                                            width: 140,
                                            border: selectedBrand === brand ? '2px solid #3f51b5' : 'none',
                                            backgroundColor: selectedBrand === brand ? '#e0e0e0' : 'transparent',
                                            transition: 'background-color 0.3s, border 0.3s',
                                        }}
                                    >
                                        <CardActionArea sx={{ height: 140 }} onClick={() => handleBrandFilter(brand)}>
                                            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                <Box sx={{ height: 70, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <img src={`/logos/${brand.toLowerCase()}.png`} alt={brand} width={70} height={70} style={{ objectFit: "contain" }} />
                                                </Box>
                                                <Typography variant="body2" style={{ cursor: 'pointer', marginTop: 8 }}>
                                                    {brand}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </div>
                            ))}
                        </Slider>
                    </Box>
                </Box>
            </Container>

            <Container sx={{marginBottom: 2}}>
                <Box mb={3}>
                    <Box gap={3} display="flex" justifyContent="between">
                        <TextField
                            sx={{ width: "600px" }}
                            label="Buscar por marca ou modelo"
                            variant="outlined"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                        <FormControl variant="outlined" sx={{ width: 200 }}>
                            <InputLabel>Filtrar por ano</InputLabel>
                            <Select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                label="Filtrar por ano"
                            >
                                <MenuItem value="">Todos os anos</MenuItem>
                                {availableYears.map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box display={"flex"} alignItems={"center"}>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<MenuIcon />}
                                endIcon={<ArrowDropDownIcon />}
                                sx={{ height: "70%" }}
                                onClick={handleSortOrderChange}
                            >
                                Ordenar por preço
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                        <CircularProgress />
                    </Box>
                ) : filteredVehicles.length === 0 ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                        <Typography variant="h6" color="text.secondary">
                            Nenhum veículo encontrado.
                        </Typography>
                    </Box>
                ) : (
                    <Grid2 container spacing={3}>
                        {filteredVehicles.map((vehicle) => (
                            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={vehicle.id}>
                                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                                    <Box position="relative">
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={vehicle.images[0]}
                                            alt={vehicle.name}
                                            sx={{
                                                borderRadius: "12px 12px 0 0",
                                                objectFit: "cover",
                                                width: "100%",
                                                height: "206px"
                                            }}
                                        />
                                        {vehicle.label && (
                                            <Chip
                                                label={vehicle.label}
                                                color="success"
                                                sx={{
                                                    position: "absolute",
                                                    top: 10,
                                                    left: 10,
                                                    fontSize: 12,
                                                    fontWeight: "bold",
                                                }}
                                            />
                                        )}
                                    </Box>
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold">
                                            {vehicle.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {vehicle.marca}
                                        </Typography>
                                        <Box display="flex" justifyContent="space-between" mt={1} flexWrap="wrap">
                                            <Box display="flex" alignItems="center" sx={{ width: '33.33%' }}>
                                                <SpeedIcon fontSize="small" />
                                                <Typography variant="body2" ml={0.5}>
                                                    {vehicle.miles}
                                                </Typography>
                                            </Box>
                                            <Box display="flex" alignItems="center" sx={{ width: '33.33%' }}>
                                                <LocalGasStationIcon fontSize="small" />
                                                <Typography variant="body2" ml={0.5}>
                                                    {vehicle.fuel}
                                                </Typography>
                                            </Box>
                                            <Box display="flex" alignItems="center" sx={{ width: '33.33%' }}>
                                                <DirectionsCarIcon fontSize="small" />
                                                <Typography variant="body2" ml={0.5}>
                                                    {vehicle.transmission}
                                                </Typography>
                                            </Box>
                                            <Box paddingTop={"10px"} display="flex" alignItems="center" sx={{ width: '33.33%' }}>
                                                <CalendarMonthIcon fontSize="small" />
                                                <Typography variant="body2" ml={0.5}>
                                                    {vehicle.anoModelo}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                                            <Typography variant="h5" fontWeight="bold">
                                                {vehicle.price}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="primary"
                                                fontWeight="bold"
                                                sx={{ cursor: "pointer" }}
                                                onClick={() => handleViewDetails(vehicle.id)}
                                            >
                                                Ver detalhes →
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid2>
                        ))}
                    </Grid2>
                )}
            </Container>
        </>

    );
}
