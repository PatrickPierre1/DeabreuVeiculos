"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import CallMadeIcon from "@mui/icons-material/CallMade";
import AnimatedWave from "../AnimatedWaves";

export const Hero = () => {
    return (
        <>
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "calc(100vh)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "white",
                    overflow: "hidden",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px"
                }}
            >
                <Image
                    src={"/images/corollaBanner.png"}
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    priority
                />

                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                />
                <Container
                    sx={{
                        position: "absolute",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        px: 2,
                    }}
                >
                    <Typography fontSize={"16px"} maxWidth="600px">
                        Encontre carros para venda perto de você
                    </Typography>
                    <Typography fontSize={"60px"} fontWeight="bold">
                        Encontre o seu carro dos sonhos
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                backgroundColor: "#e0c000",
                                color: "white",
                                "&:hover": { backgroundColor: "#bda000" },
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                textTransform: "capitalize"
                            }}
                            endIcon={<CallMadeIcon />}
                        >
                            Saiba Mais
                        </Button>
                        <Button
                            variant="outlined"
                            color="inherit"
                            size="large"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                color: "white",
                                borderColor: "white",
                                textTransform: "capitalize",
                                "&:hover": {
                                    borderColor: "#e0c000",
                                    color: "#e0c000",
                                },
                            }}
                            endIcon={<CallMadeIcon />}
                        >
                            Contato
                        </Button>
                    </Box>
                </Container>
            </Box>
            <AnimatedWave/>
        </>
    );
};
