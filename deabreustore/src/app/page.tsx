import { CarDetails } from "@/components/CarDetails";
import { CarFilterSection } from "@/components/CarFilter";
import FinanceSection from "@/components/FinanceSection";
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import VehicleList from "@/components/VehicleList";
import { Container, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <Container>
        <Typography textAlign={"center"} color="#212121" paddingTop={"0px"} variant="h4" fontWeight="bold" mb={2}>Qual veículo você está buscando?</Typography>
      </Container>
      <VehicleList />
      <FinanceSection />
      <Location />
    </>
  );
}
