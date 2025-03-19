import FinanceSection from "@/components/FinanceSection";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { ElementType } from "react";
import { Location } from "@/components/Location";

type IconName = "SavedSearchIcon" | "CheckCircleIcon" | "AssignmentTurnedInIcon";

const iconMap: Record<IconName, ElementType> = {
    SavedSearchIcon,
    CheckCircleIcon,
    AssignmentTurnedInIcon,
};

export default function Financie() {
    const cards: { id: number; icon: IconName; title: string; description: string }[] = [
        {
            id: 1,
            icon: "SavedSearchIcon",
            title: "Pesquisa",
            description: "Fazemos a pesquisa de taxas nos bancos com base nos seus dados básicos, do veículo e valor a ser financiado.",
        },
        {
            id: 2,
            icon: "CheckCircleIcon",
            title: "Aprovação",
            description: "Você escolhe a melhor opção e passamos todos os seus dados ao banco para aprovação.",
        },
        {
            id: 3,
            icon: "AssignmentTurnedInIcon",
            title: "Pronto!",
            description: "Agora é só assinar o contrato com a Albatroz Automóveis e realizar o pagamento.",
        },
    ];
    return (
        <>
            <Box width={"100%"} sx={{ backgroundColor: "#323232", height: "106px" }}></Box>
            <FinanceSection />
            <Box padding={"80px"} sx={{ backgroundColor: "#424242" }}>
                <Typography fontWeight={"bold"} fontSize={"40px"} color="#c6c6c6" display={"flex"} justifyContent={"center"} variant="h3">Veja como o processo é fácil</Typography>
                <Grid pt={5} container spacing={2} justifyContent={"center"}>
                    {cards.map((card) => {
                        const IconComponent = iconMap[card.icon];
                        return (
                            <Grid key={card.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                <Card sx={{ minWidth: 275, height: 380, padding: "48px", backgroundColor: "#313131" }}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="center">
                                            {IconComponent && <IconComponent sx={{ fontSize: 100, color: "#4c4c4c" }} />}
                                        </Box>
                                        <Typography fontWeight="bold" fontSize="30px" color="#c6c6c6" textAlign="center" variant="h5">
                                            {card.title}
                                        </Typography>
                                        <Typography pt="10px" fontSize="20px" textAlign="center" color="#c6c6c6" variant="body2">
                                            {card.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
            <Box sx={{backgroundColor: "#424242"}}>
                <Container>
                    <Box sx={{
                        width: "100%",
                        height: "3px",
                        backgroundColor: "#e0c000",
                        borderRadius: "100%"
                    }} />
                </Container>
            </Box>
            <Location />
        </>
    )
}