"use client";
import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';
import { DirectionsCar, LocalOffer, People } from '@mui/icons-material';
import Grid from "@mui/material/Grid2";

export default function Home() {
  const [veiculos, setVeiculos] = useState(0);
  const [marcas, setMarcas] = useState(0);
  const [modelos, setModelos] = useState(0);
  const [veiculosDisponiveis, setVeiculosDisponiveis] = useState(0);
  const [veiculosVendidos, setVeiculosVendidos] = useState(0);
  const [clientes, setClientes] = useState(0);

  useEffect(() => {
    setVeiculos(150);
    setMarcas(20);
    setModelos(50);
    setVeiculosDisponiveis(100);
    setVeiculosVendidos(50);
    setClientes(200);
  }, []);
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ backgroundColor: '#e0c000' }}>
            <CardContent>
              <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                <DirectionsCar sx={{ marginRight: '8px' }} />
                Veículos Cadastrados
              </Typography>
              <Typography variant="h4">
                {veiculos}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ backgroundColor: '#e0c000' }}>
            <CardContent>
              <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalOffer sx={{ marginRight: '8px' }} />
                Marcas Cadastradas
              </Typography>
              <Typography variant="h4">
                {marcas}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ backgroundColor: '#e0c000' }}>
            <CardContent>
              <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                <DirectionsCar sx={{ marginRight: '8px' }} />
                Modelos Cadastrados
              </Typography>
              <Typography variant="h4">
                {modelos}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ backgroundColor: '#e0c000' }}>
            <CardContent>
              <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                <DirectionsCar sx={{ marginRight: '8px' }} />
                Veículos Disponíveis para Venda
              </Typography>
              <Typography variant="h4">
                {veiculosDisponiveis}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ backgroundColor: '#e0c000' }}>
            <CardContent>
              <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                <DirectionsCar sx={{ marginRight: '8px' }} />
                Veículos Vendidos
              </Typography>
              <Typography variant="h4">
                {veiculosVendidos}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ backgroundColor: '#e0c000' }}>
            <CardContent>
              <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                <People sx={{ marginRight: '8px' }} />
                Clientes Cadastrados
              </Typography>
              <Typography variant="h4">
                {clientes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
