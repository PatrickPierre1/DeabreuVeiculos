import { Box, Button, Card, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";

const banks = [
    { name: "Banco Pan", logo: "/images/bancos/banco-pan.png" },
    { name: "Bradesco", logo: "/images/bancos/bradesco.png" },
    { name: "BV", logo: "/images/bancos/bv.png" },
    { name: "Itaú", logo: "/images/bancos/itau.png" },
    { name: "Omni", logo: "/images/bancos/omni.png" },
    { name: "Porto Seguro", logo: "/images/bancos/porto-seguro.png" },
    { name: "Sicredi", logo: "/images/bancos/sicredi.png" },
    { name: "Santander", logo: "/images/bancos/santander.png" },
];

const FinanceSection = () => {
    return (
        <Box sx={{ backgroundColor: "#F9F9F9", py: 5, px: 10, textAlign: "center", my: 5 }}>
            <Typography variant="h4" fontWeight="bold" color="primary">
                Financiar
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 8, mt: 2 }}>
                Faça o financiamento de veículo particular aqui com a gente. Temos parceria com as principais financiadoras do mercado.
            </Typography>

            <Container maxWidth="lg">
                <Box gap={10} display={"flex"}>
                    <Grid container spacing={2} justifyContent="center">
                        {banks.map((bank, index) => (
                            <Grid display={"flex"} alignItems={"center"} flexDirection={"column"} key={index} size={{ xs: 6, sm: 4, md: 3, lg: 3 }}>
                                <Image draggable="false" src={bank.logo} alt={bank.name} width={80} height={80} />
                                <Typography variant="body2" color="textPrimary" sx={{ mt: 1 }}>
                                    {bank.name}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>

                    <Box
                        sx={{
                            backgroundColor: "#FFF",
                            p: { xs: 2, sm: 3 },
                            mt: 4,
                            boxShadow: 3,
                            borderRadius: 2,
                            maxWidth: 400,
                            width: "100%",
                            height: "150px",
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Typography variant="body1" color="textPrimary">
                            Nossos consultores avaliam qual é a {" "}
                            <strong style={{ color: "#1976D2" }}>melhor taxa de juros para o seu perfil.</strong>
                        </Typography>
                        <Button fullWidth variant="contained" color="primary">
                            Entre em contato
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default FinanceSection;
