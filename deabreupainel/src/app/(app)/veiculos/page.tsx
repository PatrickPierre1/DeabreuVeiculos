"use client";
import * as React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography, Snackbar, Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, IconButton, DialogContentText, Alert, Checkbox } from "@mui/material";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import { CloudUpload as CloudUploadIcon, ControlPoint, Delete, Edit } from '@mui/icons-material';
import type { FormData } from "@/app/interfaces/FormData";

export default function Veiculos() {
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [brands, setBrands] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [editingId, setEditingId] = React.useState<number>();
    const [formData, setFormData] = React.useState<FormData>({
        name: "",
        brand_id: "",
        anoModelo: "",
        cor: "",
        portas: "",
        price: "",
        miles: "",
        fuel: "flex",
        transmission: "manual",
        label: "",
        tipo: "",
        images: [], // Agora armazenamos arquivos aqui
        logo: null, // Inicializando logo como null
    });
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [typeSnackbar, setTypeSnackbar] = React.useState<"success" | "error" | "warning" | "info">();
    const validFuelValues = ["flex", "diesel", "gasolina", "etanol", "eletrico"];
    const validTransmissionValues = ["automatico", "manual"];

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
        { field: "brand", headerName: "Marca", width: 150 },
        { field: "brand_id", headerName: "Marca ID", width: 0, hideable: false },
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
            field: "sold",
            headerName: "Vendido",
            width: 100,
            renderCell: (params: any) => (
                <Checkbox
                    checked={params.value}
                    onChange={() => handleSoldChange(params.row.id, !params.value)}
                />
            ),
        },
        {
            field: "opcoes", headerName: "Opções", width: 200,
            renderCell: (params: any) => (
                <Box>
                    <IconButton onClick={() => {
                        setFormData({
                            name: params.row.name || "",
                            brand_id: params.row.brand_id || "",
                            anoModelo: params.row.anoModelo || "",
                            cor: params.row.cor || "",
                            portas: params.row.portas || "",
                            price: params.row.price || "",
                            miles: params.row.miles || "",
                            fuel: validFuelValues.includes(params.row.fuel) ? params.row.fuel : "flex", // Verificação de valor válido
                            transmission: validTransmissionValues.includes(params.row.transmission) ? params.row.transmission : "automatico", // Verificação de valor válido
                            label: params.row.label || "",
                            tipo: params.row.tipo || "",
                            images: [],
                            logo: null
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({
            name: "",
            brand_id: "",
            anoModelo: "",
            cor: "",
            portas: "",
            price: "",
            miles: "",
            fuel: "flex",
            transmission: "manual",
            label: "",
            tipo: "",
            images: [], // Agora armazenamos arquivos aqui
            logo: null, // Inicializando logo como null
        })
        setIsEditing(false);
    };

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = event.target as { name: string; value: string };
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = e.target.files;
            setFormData((prev) => ({
                ...prev,
                images: Array.from(selectedFiles),
            }));
        }
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setFormData((prev) => ({
                ...prev,
                logo: file,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            if (key === "images") {
                value.forEach((image: File) => {
                    formDataToSend.append("images[]", image);
                });
            } else if (key === "logo" && value) {
                formDataToSend.append("logo", value);
            } else {
                formDataToSend.append(key, value as string);
            }
        }

        try {
            const token = localStorage.getItem('deabreu.token');

            if (isEditing) {
                formDataToSend.append('_method', 'PUT');
                await axios.post(`http://localhost:8000/api/cars/${editingId}`, formDataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }).then(() => {
                    setTypeSnackbar("success");
                    setSnackbarMessage("Veiculo editado com sucesso.");
                    setSnackbarOpen(true);
                    fetchCars();
                    setOpenDelete(false);
                }).catch((error) => {
                    setTypeSnackbar("error");
                    setSnackbarMessage("Erro ao editar o veículo. Tente novamente.");
                    setSnackbarOpen(true);
                    console.log(error);
                });
            } else {
                await axios.post("http://localhost:8000/api/cars", formDataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
            }
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
            const token = localStorage.getItem('deabreu.token');
            const response = await axios.get("http://localhost:8000/api/cars", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRows(response.data.data);
        } catch (error) {
            console.error("Erro ao buscar os carros:", error);
        } finally {
            setLoading(false);
        }
    };
    const fetchBrands = async () => {
        try {
            const token = localStorage.getItem('deabreu.token');
            const response = await axios.get("http://localhost:8000/api/brands", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBrands(response.data.data);
            console.log(brands);
        } catch (error) {
            console.error("Erro ao buscar os marcas:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        const token = localStorage.getItem('deabreu.token');
        axios.delete(`http://localhost:8000/api/cars/${editingId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            fetchCars();
            setOpenDelete(false);
        }).catch((error) => {
            setSnackbarMessage("Erro ao excluir o veículo. Tente novamente.");
            setSnackbarOpen(true);
        });
    }

    const handleSoldChange = async (id: number, sold: boolean) => {
        const token = localStorage.getItem('deabreu.token');
        try {
            await axios.patch(`http://localhost:8000/api/cars/${id}/sold`, { sold }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSnackbarMessage("Status de venda atualizado com sucesso.");
            setTypeSnackbar("success");
            setSnackbarOpen(true);
            fetchCars();
        } catch (error) {
            setSnackbarMessage("Erro ao atualizar o status de venda. Tente novamente.");
            setTypeSnackbar("error");
            setSnackbarOpen(true);
            console.error("Erro ao atualizar o status de venda:", error);
        }
    };

    React.useEffect(() => {
        fetchCars();
        fetchBrands();
    }, []);

    return (
        <Box sx={{ height: 500, width: "100%" }}>

            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Lista de Veículos
                </Typography>
                <Button variant="contained" onClick={handleClickOpen} sx={{ mb: 2, gap: 1 }}>
                    Adicionar Veículo <ControlPoint />
                </Button>
            </Box>
            <Box sx={{ height: "100vh", width: "82vw", overflowX: "scroll" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    disableRowSelectionOnClick
                    pageSizeOptions={[5, 10, 20]}
                    localeText={{
                        toolbarQuickFilterPlaceholder: "Buscar ...",
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
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                    columnVisibilityModel={{
                        brand_id: false,
                    }}
                />
            </Box>

            <Dialog open={open} onClose={handleClose}>
                {isEditing ? (
                    <DialogTitle>Atualizar Veículo </DialogTitle>
                ) : (
                    <DialogTitle>Adicionar Novo Veículo</DialogTitle>
                )}
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
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="brand-label">Marca</InputLabel>
                                    <Select
                                        labelId="brand-label"
                                        name="brand_id"
                                        value={formData.brand_id || ""}
                                        onChange={handleChange}
                                        label="Marca"
                                    >
                                        {brands.map((brand: any) => (
                                            <MenuItem key={brand.id} value={brand.id}>
                                                {brand.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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
                                            <MenuItem value="diesel">Diesel</MenuItem>
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
                            {/* Escolha as imagens do veículo */}
                            <Grid size={{ xs: 12, sm: 12 }}>
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
                                {isEditing ? (
                                    "Atualizar"
                                ) : (
                                    "Adicionar"
                                )}
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
                    <Button color="error" onClick={handleDelete}>Excluir</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={typeSnackbar || 'info'} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

