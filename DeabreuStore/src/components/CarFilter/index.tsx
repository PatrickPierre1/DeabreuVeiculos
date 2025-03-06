'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardActionArea, CardContent, Container } from '@mui/material';
import Grid from "@mui/material/Grid2";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Slider from "react-slick";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Vehicle {
  id: number;
  name: string;
  marca: string;
  logo: string;
  anoModelo: number;
  cor: string;
  portas: number;
  images: string[];
  price: string;
  miles: string;
  fuel: string;
  transmission: string;
  label: string;
  tipo: string;
}

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

const Types = [
  { name: "Sedan", logo: "/logos/tipos/sedan.png" },
  { name: "Hatchback", logo: "/logos/tipos/hatchback.png" },
  { name: "SUV", logo: "/logos/tipos/suv.png" },
  { name: "Picapes", logo: "/logos/tipos/picapes.png" },
  { name: "Motos", logo: "/logos/tipos/motos.png" },
];

export const CarFilterSection = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/vehicles')
      .then(res => res.json())
      .then((data: Vehicle[]) => {
        setVehicles(data);
        const uniqueBrands = Array.from(new Set(data.map((vehicle) => vehicle.marca)));
        setBrands(uniqueBrands);
        setFilteredVehicles(data);
      });
  }, []);

  const handleBrandFilter = (brand: string) => {
    const filtered = vehicles.filter(vehicle => vehicle.marca === brand);
    setFilteredVehicles(filtered);
  };

  const handleTypeFilter = (type: string) => {
    const filtered = vehicles.filter(vehicle => vehicle.tipo === type);
    setFilteredVehicles(filtered);
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
    <Container>
      <Box sx={{ p: 4 }}>
        <Grid container justifyContent="center">
          {Types.map((type) => (
            <Grid key={type.name} size={{ xs: 6, sm: 4, md: 2 }}>
              <Card sx={{ textAlign: 'center', width: 138 }}>
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
            </Grid>
          ))}
        </Grid>

        <Box mt={5}>
          <Slider {...settings2} className='.custom-slick-carousel'>
            {brands.map((brand) => (
              <div key={brand} style={{ textAlign: 'center', padding: '10px' }}>
                <Card sx={{ textAlign: 'center', width: 140 }}>
                  <CardActionArea sx={{ height: 140 }} onClick={() => handleBrandFilter(brand)}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      {/* Container da imagem com altura fixa */}
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
  );
};
