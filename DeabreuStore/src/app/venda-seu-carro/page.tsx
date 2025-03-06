import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { Button, Checkbox, TextField, } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ChatIcon from "@mui/icons-material/Chat";
import ChecklistIcon from "@mui/icons-material/Checklist";
import HandshakeIcon from "@mui/icons-material/Handshake";

export default function Venda() {
    const cards: { id: number; icon: string; title: string; description: string }[] = [
        {
            id: 1,
            icon: "01",
            title: "Venda na hora!",
            description: "Para quem precisa de dinheiro na hora! Compramos o seu veículo e pagamos à vista. Simples assim.",
        },
        {
            id: 2,
            icon: "02",
            title: "Troco na troca",
            description: "Para quem quer sair de carro novo! Você pode trocar o seu veículo por outro de maior ou menor valor. Se for maior, negociamos a diferença. Se for menor, já sai com o dinheiro no bolso.",
        },
        {
            id: 3,
            icon: "03",
            title: "Consignação",
            description: "Mais segurança e rentabilidade para você! Anunciamos seu veículo nos principais portais e passamos as propostas. Quando vendido, você recebe o valor à vista.",
        },
    ];
    return (
        <>
            <Box width={"100%"} sx={{ backgroundColor: "#323232", height: "106px" }}></Box>
            <Box paddingY={5} sx={{backgroundColor: "#424242"}} display={"flex"} alignItems={"center"} flexDirection={"column"}>
                <Typography fontWeight={"bold"} fontSize={"40px"} color="#c6c6c6">Quer vender seu veículo?</Typography>
                <Typography fontSize={"20px"} color="#c6c6c6">Solicite a avaliação agora!</Typography>
            </Box>
            <Box sx={{ backgroundColor: "#151515", color: "#fff", p: 10 }}>
                <Container>
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="h6" fontWeight="bold">DADOS DO VEÍCULO</Typography>
                            <TextField
                                fullWidth
                                label="Seu veículo..."
                                variant="filled"
                                margin="dense"
                                sx={{ flex: 1, backgroundColor: "#fff", borderRadius: 1, }}
                            />
                            <Typography variant="caption">Ex: Gol 2018</Typography>

                            <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                                DADOS DE CONTATO
                            </Typography>
                            <TextField
                                fullWidth
                                label="Nome"
                                variant="filled"
                                margin="dense"
                                sx={{ flex: 1, backgroundColor: "#fff", borderRadius: 1 }}
                            />
                            <Box display="flex" alignItems="center">
                                <TextField
                                    label="Celular"
                                    variant="filled"
                                    margin="dense"
                                    sx={{ flex: 1, backgroundColor: "#fff", borderRadius: 1 }}
                                />
                                <Checkbox sx={{ color: "#fff" }} />
                                <Typography variant="body2">Whatsapp</Typography>
                            </Box>
                            <TextField
                                fullWidth
                                label="E-mail"
                                variant="filled"
                                margin="dense"
                                sx={{ flex: 1, backgroundColor: "#fff", borderRadius: 1 }}
                            />
                            <Button fullWidth variant="contained" size="large" sx={{ mt: 2, backgroundColor: "#e0c000" }}>
                                Enviar
                            </Button>
                        </Grid>

                        <Grid display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} size={{ xs: 12, md: 6 }}>
                            <Typography variant="h6" fontWeight="bold">QUAIS SÃO OS PRÓXIMOS PASSOS?</Typography>
                            <Box display="flex" alignItems="center" gap={2} mt={2}>
                                <ChatIcon sx={{ fontSize: 40, color: "#4c4c4c" }} />
                                <Typography>Entramos em contato</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={2} mt={2}>
                                <ChecklistIcon sx={{ fontSize: 40, color: "#4c4c4c" }} />
                                <Typography>Avaliamos seu veículo</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={2} mt={2}>
                                <HandshakeIcon sx={{ fontSize: 40, color: "#4c4c4c" }} />
                                <Typography>Fechamos negócio</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Box padding={"50px 80px 80px 80px"} sx={{ backgroundColor: "#424242" }}>
                <Typography fontWeight={"bold"} fontSize={"40px"} color="#c6c6c6" display={"flex"} justifyContent={"center"} variant="h3">Conheça as suas opções</Typography>
                <Grid pt={5} container spacing={2} justifyContent={"center"}>
                    {cards.map((card) => {
                        return (
                            <Grid key={card.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                <Card sx={{ minWidth: 250, height: 400, padding: "48px", backgroundColor: "#313131" }}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="start">
                                            <Typography color="#e0c000" fontSize={"55px"} fontWeight={"bold"}>{card.icon}</Typography>
                                        </Box>
                                        <Typography fontWeight="bold" fontSize="35px" color="#f5f5f5" textAlign="start" variant="h5">
                                            {card.title}
                                        </Typography>
                                        <Typography pt="10px" fontSize="20px" textAlign="justify" color="#c6c6c6" variant="body2">
                                            {card.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </>

    )
}