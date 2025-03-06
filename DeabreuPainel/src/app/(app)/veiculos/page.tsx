"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, Avatar, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, IconButton, DialogContentText } from "@mui/material";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import { CloudUpload as CloudUploadIcon, ControlPoint, Delete, Edit } from '@mui/icons-material';

interface FormData {
    name: string;
    marca: string;
    anoModelo: string;
    cor: string;
    portas: string;
    price: string;
    miles: string;
    fuel: string;
    transmission: string;
    label: string;
    tipo: string;
    images: File[]; // Agora estamos esperando um array de arquivos
    logo: File | null; // Adicionando logo
}

export default function Veiculos() {
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [editingId, setEditingId] = React.useState();
    const [formData, setFormData] = React.useState<FormData>({
        name: "",
        marca: "",
        anoModelo: "",
        cor: "",
        portas: "",
        price: "",
        miles: "",
        fuel: "",
        transmission: "",
        label: "",
        tipo: "",
        images: [], // Agora armazenamos arquivos aqui
        logo: null, // Inicializando logo como null
    });

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "logo",
            headerName: "Logo",
            width: 100,
            renderCell: (params: any) => (
                <Avatar
                    src={`http://localhost:8000/storage/${params.value}`}
                    alt="Logo"
                    variant="square"
                    sx={{ width: 50, height: 50 }}
                />
            ),
        },
        { field: "name", headerName: "Nome", width: 150 },
        { field: "marca", headerName: "Marca", width: 150 },
        { field: "anoModelo", headerName: "Ano", width: 100 },
        { field: "cor", headerName: "Cor", width: 100 },
        { field: "portas", headerName: "Portas", width: 100 },
        { field: "price", headerName: "Preço (R$)", width: 130 },
        { field: "miles", headerName: "Km Rodados", width: 130 },
        { field: "fuel", headerName: "Combustível", width: 130 },
        { field: "transmission", headerName: "Transmissão", width: 130 },
        { field: "label", headerName: "Status", width: 100 },
        { field: "tipo", headerName: "Tipo", width: 130 },
        {
            field: "opcoes", headerName: "Opções", width: 200,
            renderCell: (params: any) => (
                <Box>
                    <IconButton onClick={() => {
                        setFormData({
                            name: params.row.name,
                            marca:params.row.marca,
                            anoModelo: params.row.anoModelo,
                            cor: params.row.cor,
                            portas: params.row.portas,
                            price: params.row.price,
                            miles: params.row.miles,
                            fuel: params.row.fuel,
                            transmission: params.row.transmission,
                            label: params.row.label,
                            tipo: params.row.tipo,
                            images: [], // Agora armazenamos arquivos aqui
                            logo: null, // Inicializando logo como null
                        })
                        setIsEditing(true);
                        setEditingId(params.row.id)
                        setOpen(true);
                    }}><Edit sx={{ color: "#1976d3" }} /></IconButton>
                    <IconButton onClick={handleClickOpenDelete}><Delete sx={{ color: "#e50914" }} /></IconButton>
                </Box>
            ),
        },
    ];

    // Abrir o modal
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Fechar o modal
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    // Fechar o modal
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    // Atualizar os campos do formulário
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = event.target as { name: string; value: string };
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Atualizar os arquivos de imagem (para as imagens de carro)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = e.target.files;
            setFormData((prev) => ({
                ...prev,
                images: Array.from(selectedFiles), // Agora armazenamos os arquivos em vez de nomes
            }));
        }
    };

    // Atualizar o arquivo de logo
    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null; // Verifica se existe algum arquivo
        if (file) {
            setFormData((prev) => ({
                ...prev,
                logo: file, // Armazenando o arquivo da logo
            }));
        }
    };

    // Enviar os dados para a API
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            if (key === "images") {
                value.forEach((image: File) => {
                    formDataToSend.append("images[]", image); // Agora estamos enviando arquivos
                });
            } else if (key === "logo" && value) {
                formDataToSend.append("logo", value); // Adicionando logo
            } else {
                formDataToSend.append(key, value as string);
            }
        }

        try {
            const token = localStorage.getItem('deabreu.token');
            await axios.post("http://localhost:8000/api/cars", formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data", // Certifique-se de enviar o tipo correto
                },
            });
            // Fechar o modal e recarregar os veículos
            handleClose();
            setLoading(true);
            fetchCars();
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
        }
    };

    // Buscar os carros
    const fetchCars = async () => {
        try {
            const token = localStorage.getItem('deabreu_token');
            const response = await axios.get("http://localhost:8000/api/cars", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRows(response.data);
        } catch (error) {
            console.error("Erro ao buscar os carros:", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchCars();
    }, []);

    return (
        <Box sx={{ height: 500, width: "100%" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Lista de Veículos
            </Typography>
            <Box display={"flex"} justifyContent={"flex-end"}>
                <Button variant="contained" onClick={handleClickOpen} sx={{ mb: 2, gap: 1 }}>
                    Adicionar Veículo <ControlPoint />
                </Button>
            </Box>
            {loading ? (
                <CircularProgress />
            ) : (
                <Box sx={{ height: 400, width: "82vw", overflowX: "scroll" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        disableRowSelectionOnClick
                        pageSizeOptions={[5, 10, 20]}
                        localeText={{
                            noRowsLabel: 'Nenhum registro encontrado',
                            noResultsOverlayLabel: 'Nenhum resultado encontrado',
                            toolbarDensity: 'Densidade',
                            toolbarDensityLabel: 'Densidade',
                            toolbarDensityCompact: 'Compacta',
                            toolbarDensityStandard: 'Padrão',
                            toolbarDensityComfortable: 'Confortável',
                            toolbarFilters: 'Filtros',
                            toolbarFiltersLabel: 'Mostrar filtros',
                            toolbarColumns: 'Colunas',
                            toolbarColumnsLabel: 'Selecionar colunas',
                            toolbarExport: 'Exportar',
                            toolbarExportLabel: 'Exportar',
                            toolbarExportCSV: 'Baixar CSV',
                            footerTotalRows: 'Total de linhas:',
                            columnMenuSortAsc: "Ordenar crescente",
                            columnMenuSortDesc: "Ordenar decrescente",
                            columnMenuFilter: "Filtrar",
                            columnMenuHideColumn: "Ocultar coluna",
                            columnMenuManageColumns: "Gerenciar colunas",
                            footerRowSelected: (count) =>
                                count !== 1 ? `${count} linhas selecionadas` : `${count} linha selecionada`,
                        }}
                    />
                </Box>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Adicionar Novo Veículo</DialogTitle>
                <DialogContent>
                    <form style={{ paddingTop: "10px" }} onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    label="Nome"
                                    name="name"
                                    fullWidth
                                    value={formData.name}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                    required
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    label="Marca"
                                    name="marca"
                                    fullWidth
                                    value={formData.marca}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                    required
                                />
                            </Grid>

                            {/* Ano, Cor e Portas na mesma linha */}
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <TextField
                                        label="Ano"
                                        name="anoModelo"
                                        fullWidth
                                        value={formData.anoModelo}
                                        onChange={handleChange}
                                        sx={{ mb: 2 }}
                                        required
                                        type="number"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <TextField
                                        label="Cor"
                                        name="cor"
                                        fullWidth
                                        value={formData.cor}
                                        onChange={handleChange}
                                        sx={{ mb: 2 }}
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                        <InputLabel id="portas-label">Portas</InputLabel>
                                        <Select
                                            labelId="portas-label"
                                            name="portas"
                                            value={formData.portas}
                                            onChange={handleChange}
                                            label="Portas"
                                        >
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            {/* Preço e Km Rodados */}
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    label="Preço (R$)"
                                    name="price"
                                    type="number"
                                    fullWidth
                                    value={formData.price}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    }}
                                    required
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    label="Km Rodados"
                                    name="miles"
                                    type="number"
                                    fullWidth
                                    value={formData.miles}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                    required
                                />
                            </Grid>

                            {/* Combustível, Transmissão e Tipo na mesma linha */}
                            <Grid container width={"100%"} spacing={3}>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                        <InputLabel id="fuel-label">Combustível</InputLabel>
                                        <Select
                                            labelId="fuel-label"
                                            name="fuel"
                                            value={formData.fuel}
                                            onChange={handleChange}
                                            label="Combustível"
                                        >
                                            <MenuItem value="flex">Flex</MenuItem>
                                            <MenuItem value="gasolina">Gasolina</MenuItem>
                                            <MenuItem value="etanol">Etanol</MenuItem>
                                            <MenuItem value="eletrico">Elétrico</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                        <InputLabel id="transmission-label">Transmissão</InputLabel>
                                        <Select
                                            labelId="transmission-label"
                                            name="transmission"
                                            value={formData.transmission}
                                            onChange={handleChange}
                                            label="Transmissão"
                                        >
                                            <MenuItem value="automatico">Automático</MenuItem>
                                            <MenuItem value="manual">Manual</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                        <InputLabel id="tipo-label">Tipo</InputLabel>
                                        <Select
                                            labelId="tipo-label"
                                            name="tipo"
                                            value={formData.tipo}
                                            onChange={handleChange}
                                            label="Tipo"
                                        >
                                            <MenuItem value="Suv">SUV</MenuItem>
                                            <MenuItem value="Picapes">Picapes</MenuItem>
                                            <MenuItem value="Sedan">Sedan</MenuItem>
                                            <MenuItem value="hatchback">Hatchback</MenuItem>
                                            <MenuItem value="coupé">Coupé</MenuItem>
                                            <MenuItem value="motos">Motos</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            {/* Status */}
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    label="Status"
                                    name="label"
                                    fullWidth
                                    value={formData.label}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                    required
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <input
                                    type="file"
                                    name="logo"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    id="logo-upload"
                                    style={{ display: 'none' }}
                                />
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    component="label"
                                    htmlFor="logo-upload"
                                    startIcon={<CloudUploadIcon />}
                                    sx={{
                                        width: '100%',
                                        textTransform: 'none',
                                        padding: '10px 20px',
                                        justifyContent: 'center',
                                    }}
                                >
                                    Escolher Logo
                                </Button>
                            </Grid>

                            {/* Escolha as imagens do veículo */}
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <input
                                    type="file"
                                    name="images"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    id="images-upload"
                                    style={{ display: 'none' }}
                                />
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    component="label"
                                    htmlFor="images-upload"
                                    startIcon={<CloudUploadIcon />}
                                    sx={{
                                        width: '100%',
                                        textTransform: 'none',
                                        padding: '10px 20px',
                                        justifyContent: 'center',
                                    }}
                                >
                                    Escolher Imagens
                                </Button>
                            </Grid>
                        </Grid>

                        <DialogActions>
                            <Button onClick={handleClose} variant="contained" color="error">
                                Cancelar
                            </Button>
                            <Button type="submit" color="primary" variant="contained">
                                Adicionar
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={openDelete} onClose={handleCloseDelete}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <DialogContentText>Tem certeza que deseja excluir este veículo?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete}>Cancelar</Button>
                    <Button color="error" onClick={() => console.log("Excluir")}>Excluir</Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}

