"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Box, CircularProgress, Card, CardContent, CardActions, Button, ListItem, ListItemText, List, Paper, Modal, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CampaignIcon from '@mui/icons-material/Campaign';
import SpeedIcon from '@mui/icons-material/Speed';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PhoneIcon from '@mui/icons-material/Phone'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import ShareIcon from '@mui/icons-material/Share';
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import { Location } from "@/components/Location";
import CarSuggestions from "@/components/Suggestion";
import CloseIcon from '@mui/icons-material/Close';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface Vehicle {
    id: number;
    name: string;
    marca: {
        id: number;
        name: string;
        logo?: string;
    };
    tipo: {
        id: number;
        name: string;
    };
    anoModelo: number;
    images: string[];
    price: string;
    miles: string;
    fuel: string;
    transmission: string;
    cor: string;
    portas: number;
}

export const CarDetails = () => {
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const [open, setOpen] = useState(false);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        if (id) {
            fetch(`/api/vehicles?id=${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setVehicle(data);
                    setIsLoading(false);
                });
        }
    }, [id]);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                <CircularProgress />
            </Box>
        );
    }
    return (
        <>
            <Box sx={{ backgroundColor: "#212121" }}>
                {vehicle && (
                    <Box paddingX={10} paddingTop={15}>
                        <Box>
                            <Box sx={{
                                width: "20vw",
                                height: "3px",
                                backgroundColor: "#e0c000",
                                marginBottom: "10px",
                                borderRadius: "100%"
                            }} />
                            <Typography fontWeight={"bold"} color={"#e0c000"} variant="h4">{vehicle.name}</Typography>
                            <Typography fontWeight={"bold"} color={"#fff"} variant="h6">{vehicle.marca.name}</Typography>
                            <Box sx={{
                                width: "20vw",
                                height: "3px",
                                backgroundColor: "#e0c000",
                                marginTop: "10px",  
                                borderRadius: "100%"
                            }} />
                        </Box>

                        <Grid container spacing={2} mt={2}>
                            <Grid size={{ xs: 12, sm: 6, md: 7 }}>
                                <Box sx={{ width: "100%", height: "100%" }}>
                                    <img
                                        src={vehicle.images[0]}
                                        alt={vehicle.name}
                                        width="100%"
                                        height="100%"
                                        style={{ borderRadius: '0px', objectFit: "cover" }}
                                    />
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                                <Grid container spacing={1}>
                                    {vehicle.images.slice(1, 5).map((image, index) => (
                                        <Grid size={{ xs: 6 }} key={index} sx={{ position: "relative" }}>
                                            <Box sx={{ width: "100%", height: "100%" }}>
                                                <img
                                                    src={image}
                                                    alt={`${vehicle.name} - ${index + 1}`}
                                                    width="100%"
                                                    height="100%"
                                                    style={{ borderRadius: '0px', objectFit: "cover" }}
                                                />
                                                {index === 3 && (
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            width: "100%",
                                                            height: "100%",
                                                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            borderRadius: "8px",
                                                            color: "white",
                                                            fontSize: "18px",
                                                            fontWeight: "bold",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => setOpen(true)}
                                                    >
                                                        Ver todas as fotos
                                                    </Box>
                                                )}
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid paddingTop={2} container spacing={2}>
                            <Grid size={{ xs: 4 }}>
                                <Box gap={1} color={"#e0c000"} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ backgroundColor: "#424242", height: "60px" }}>
                                    <CampaignIcon></CampaignIcon>
                                    <Typography fontWeight={"bold"}>Oportunidade</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 4 }}>
                                <Box gap={1} color={"#e0c000"} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ backgroundColor: "#424242", height: "60px" }}>
                                    <SpeedIcon></SpeedIcon>
                                    <Typography fontWeight={"bold"}>Baixa km</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 4 }}>
                                <Box gap={1} color={"#e0c000"} display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ backgroundColor: "#424242", height: "60px" }}>
                                    <CompareArrowsIcon></CompareArrowsIcon>
                                    <Typography fontWeight={"bold"}>Aceita troca</Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid marginTop={"20px"} container spacing={2} alignItems="start">
                            <Grid size={8} direction="column" alignItems="start" justifyContent="center" >
                                <Box>
                                    <Typography variant="h4" color="white" fontWeight={"bold"}>Ficha Tecnica</Typography>
                                    <Grid fontSize={"20px"} container spacing={2} marginTop={"10px"} color={"#c6c6c6"}>
                                        <Grid size={{ xs: 12, sm: 4 }} display="flex" justifyContent="start" alignItems="center" gap={1}>
                                            <DirectionsCarIcon fontSize="small" /> {vehicle.transmission}
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 4 }} display="flex" justifyContent="start" alignItems="center" gap={1}>
                                            <CalendarMonthIcon fontSize="small" /> {vehicle.anoModelo}
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 4 }} display="flex" justifyContent="start" alignItems="center" gap={1}>
                                            <SpeedIcon fontSize="small" /> {vehicle.miles}
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 4 }} display="flex" justifyContent="start" alignItems="center" gap={1}>
                                            <LocalGasStationIcon fontSize="small" /> {vehicle.fuel}
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 4 }} display="flex" justifyContent="start" alignItems="center" gap={1}>
                                            <WaterDropIcon fontSize="small" /> {vehicle.cor}
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 4 }} display="flex" justifyContent="start" alignItems="center" gap={1}>
                                            <AirportShuttleIcon fontSize="small" /> {vehicle.portas} portas
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box marginTop={"40px"}>
                                    <Typography variant="h5" color="white" fontWeight={"bold"}>Garantia</Typography>
                                    <Grid fontSize={"17px"} container spacing={2} marginTop={"10px"} color={"#c6c6c6"}>
                                        <Grid size={{ xs: 12, sm: 4 }} display="flex" justifyContent="start" alignItems="center" gap={1}>
                                            <Typography fontSize={"20px"}>Garantia da Loja (3 meses)</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box marginTop={"40px"}>
                                    <Typography variant="h5" color="white" fontWeight={"bold"}>+ Informações</Typography>
                                    <Grid fontSize={"20px"} spacing={2} marginTop={"10px"} color={"#c6c6c6"}>
                                        <Grid>
                                            <Typography textAlign={"justify"} fontSize={"13px"}>A procura de um Ford TERRITORY Titanium 1.5 GTDi EcoBo. Aut. - Azul - 2024 seminovo? Aqui tem. 3 Meses de garantia. Ano: 2023/2024 KM: 21968 km. Potência: 150 cv. Câmbio: Automático Consumo: Urbano: Km/l - Rodovia: Km/l. Gostou deste carro? Temos uma equipe de atendimento on-line pronta para te atender. Tire todas suas dúvidas de forma rápida e descomplicada, através do nosso WhatsApp (42)98831-2707, ou se preferir, faça uma visita.</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>

                            <Grid size={4}>
                                <Box display={"flex"} justifyContent={"center"}>
                                    <Card sx={{ width: 355, backgroundColor: "#202020", padding: "20px 10px 20px 10px" }}>
                                        <CardContent sx={{ padding: "10px" }}>
                                            <Button sx={{ backgroundColor: "#e0c000", color: 'black', }} fullWidth size="large">Enviar mensagem</Button>
                                            <Box display="flex" alignItems="center" mt={3} mb={1}>
                                                <PhoneIcon fontSize="large" sx={{ color: "#e0c000" }} />
                                                <Typography variant="body2" ml={1} color="white">
                                                    (44) 3236-5018
                                                </Typography>
                                            </Box>
                                            <Box display="flex" alignItems="center" mb={1}>
                                                <WhatsAppIcon fontSize="large" sx={{ color: "#e0c000" }} />
                                                <Typography variant="body2" ml={1} color="white">
                                                    (44) 98831-2707
                                                </Typography>
                                            </Box>
                                            <Box display="flex" alignItems="center" mb={1}>
                                                <WhatsAppIcon fontSize="large" sx={{ color: "#e0c000" }} />
                                                <Typography variant="body2" ml={1} color="white">
                                                    (44) 98881-6793
                                                </Typography>
                                            </Box>
                                            <Typography textAlign={"center"} fontWeight={"bold"} color="#188754" variant="h4">{vehicle.price}</Typography>

                                        </CardContent>
                                        <CardActions>
                                            <Button color="warning" variant="outlined" sx={{ borderColor: "#e0c000", color: '#999999' }} fullWidth size="large">Compartilhar <ShareIcon sx={{ paddingLeft: "5px" }} fontSize="medium" /></Button>
                                        </CardActions>
                                    </Card>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box sx={{
                            width: "100%",
                            height: "3px",
                            backgroundColor: "#e0c000",
                            marginTop: "30px",
                            borderRadius: "100%"
                        }} />
                    </Box>

                )}
                <CarSuggestions></CarSuggestions>
                <Location />

                <Modal open={open} onClose={() => setOpen(false)} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Box sx={{ width: "80vw", height: "80vh", backgroundColor: "rgba(0,0,0, 0.5)", borderRadius: "8px", padding: "50px", position: "relative" }}>
                        <IconButton sx={{ position: "absolute", top: 10, right: 10 }} onClick={() => setOpen(false)}>
                            <CloseIcon sx={{ color: "#fff" }} />
                        </IconButton>
                        {vehicle && (
                            <Slider {...settings}>
                                {vehicle.images.map((image, index) => (
                                    <Box key={index} sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                        <img
                                            src={image}
                                            alt={`Foto ${index + 1}`}
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "70vh",
                                                borderRadius: "8px",
                                                objectFit: "contain",
                                                margin: "auto",
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Slider>
                        )}
                    </Box>
                </Modal>
            </Box>
        </>
    );
}
