import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import BusinessIcon from '@mui/icons-material/Business'
import PhoneIcon from '@mui/icons-material/Phone'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import EmailIcon from '@mui/icons-material/Email'

export const Location = () => {
    return (
        <>
            <Box sx={{ backgroundColor: "#424242", height: "auto", padding: "40px" }}>
                <Container>
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                        <Grid size={{ xs: 4, sm: 4, md: 6 }}>
                            <Box>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.758754067024!2d-53.274885899999994!3d-23.7559808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f2d164a15956e7%3A0x7cd0294919f1f9dd!2sR.%20S%C3%A9rgio%20Zanatto%20-%20Umuarama%2C%20PR%2C%2087511-006!5e0!3m2!1spt-BR!2sbr!4v1739950343666!5m2!1spt-BR!2sbr"
                                    width="100%"
                                    height="250"
                                    style={{ border: '0', borderRadius: '8px' }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 4, sm: 4, md: 6 }}>
                            <Box display={"flex"} justifyContent={"start"}>
                                <Typography fontWeight={"bold"} variant="h4" color="#e0c000" mb={2}>
                                    Nossos contatos
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <BusinessIcon fontSize="medium" sx={{ color: "#e0c000" }} />
                                <Box display={"flex"} flexDirection={"column"}>
                                    <Typography variant="body2" ml={1} color="white">
                                        Sergio Zanatto, 3809 - Parque Residencial Interlagos
                                    </Typography>
                                    <Typography variant="body2" ml={1} color="white">
                                        Umuarama/PR - CEP 87511-006
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <PhoneIcon fontSize="medium" sx={{ color: "#e0c000" }} />
                                <Typography variant="body2" ml={1} color="white">
                                    (44) 3236-5018
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <WhatsAppIcon fontSize="medium" sx={{ color: "#e0c000" }} />
                                <Typography variant="body2" ml={1} color="white">
                                    Whatsapp: (44) 98831-2707
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <WhatsAppIcon fontSize="medium" sx={{ color: "#e0c000" }} />
                                <Typography variant="body2" ml={1} color="white">
                                    Whatsapp: (44) 98881-6793
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <EmailIcon fontSize="medium" sx={{ color: "#e0c000" }} />
                                <Typography variant="body2" ml={1} color="white">
                                    deabreuveiculos@gmail.com
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}
