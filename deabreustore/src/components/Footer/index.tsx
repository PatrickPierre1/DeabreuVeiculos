'use client';

import { Box, Typography, Link, Stack, IconButton, Divider } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import logo from "../../../public/images/logo2.png";
import Image from "next/image";

export default function Footer() {
    return (
        <Box component="footer" sx={{
            py: 4,
            textAlign: "center",
            bgcolor: "#212121",
        }}>
            <Stack spacing={1} alignItems="center">
                <Box paddingBottom={"15px"}>
                    <Image src={logo} alt="logo" width={150} height={100}></Image>
                </Box>
                <Divider component="div" role="presentation"></Divider>
                <Stack direction="row" spacing={3}>
                    <Link href="#" color="white" underline="none">
                        Home
                    </Link>
                    <Link href="#" color="white" underline="none">
                        Venda seu carro
                    </Link>
                    <Link href="#" color="white" underline="none">
                        Financie
                    </Link>
                    <Link href="#" color="white" underline="none">
                        Sobre
                    </Link>
                </Stack>
                <Stack direction="row" spacing={1} mt={1}>
                    <IconButton sx={{ color: "#e0c000" }}>
                        <Facebook />
                    </IconButton>
                    <IconButton sx={{ color: "#e0c000" }}>
                        <Twitter />
                    </IconButton>
                    <IconButton sx={{ color: "#e0c000" }}>
                        <Instagram />
                    </IconButton>
                    <IconButton sx={{ color: "#e0c000" }}>
                        <LinkedIn />
                    </IconButton>
                </Stack>
                <Typography variant="body2" color="white" mt={1}>
                    © 2025 Deabreu Veiculos. Todos os direitos reservados.
                </Typography>
            </Stack>
        </Box>
    );
}
