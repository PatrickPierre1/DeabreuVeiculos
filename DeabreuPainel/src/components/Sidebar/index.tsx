"use client";

import Link from "next/link";
import Image from "next/image";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Toolbar, Box } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const drawerWidth = 240;
const sidebarColor = "#212121"; // Defina a cor desejada aqui
const textColor = "#FFFFFF"; // Cor do texto

const menuItems = [
    { text: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
    { text: "Veículos", href: "/veiculos", icon: <DirectionsCarIcon /> },
];

export default function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    backgroundColor: `${sidebarColor} !important`, // Força a cor da Sidebar
                    color: `${textColor} !important`,
                },
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
                <Image src={"/images/logo2.png"} alt="Logo" width={120} height={120} />
            </Toolbar>
            <Box sx={{ overflow: "auto" }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.href} disablePadding>
                            <Link href={item.href} passHref style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                                <ListItemButton>
                                    <ListItemIcon sx={{color: "#e0c000"}}>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                    <ListItem disablePadding>
                        <ListItemButton href="/login">
                            <ListItemIcon sx={{color: "#d02b37"}}><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary="Sair" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}
