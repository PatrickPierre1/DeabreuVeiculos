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
    Container,
    CircularProgress,
} from "@mui/material";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SpeedIcon from "@mui/icons-material/Speed";
import Grid from "@mui/material/Grid2";

interface Vehicle {
    id: number;
    name: string;
    marca: string;
    anoModelo: number;
    images: string;
    price: string;
    miles: string;
    fuel: string;
    transmission: string;
    label?: string;
}

export default function CarSuggestions() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/vehicles")
            .then((res) => res.json())
            .then((data) => {
                const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 3);
                setVehicles(shuffled);
                setIsLoading(false);
            });
    }, []);

    const handleViewDetails = (id: number) => {
        router.push(`/veiculo/${id}`);
    };

    return (
        <Container>
            <Typography textAlign={"center"} color="white" variant="h4" fontWeight="bold" mt={5} mb={2}>
                Sugestões para você
            </Typography>
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                    <CircularProgress />
                </Box>
            ) : (
                <Grid padding={"30px 0px 30px 0px"} container spacing={3}>
                    {vehicles.map((vehicle) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={vehicle.id}>
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
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
