"use client";
import { ControlPoint, Delete, Edit, CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";

export interface FormData {
    name: string;
    logo: File | null;
}

export default function Marcas() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [editingId, setEditingId] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        logo: null,
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleDelete = () => {
        const token = localStorage.getItem('deabreu.token');
        axios.delete(`http://localhost:8000/api/brands/${editingId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            fetchBrands();
            setOpenDelete(false);
        }).catch((error) => {
        });
    }
    const handleClose = () => {
        setOpen(false);
        setFormData({
            name: "",
            logo: null,
        })
        setIsEditing(false);
    };

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Nome", width: 150 },
        {
            field: "logo", headerName: "Logos", width: 300,
            renderCell: (params: any) => (
                <Avatar
                    src={`http://localhost:8000/storage/${params.value}`}
                    alt="Logo"
                    sx={{ width: 50, height: 50 }}
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
                            logo: null
                        })
                        setIsEditing(true);
                        setEditingId(params.row.id)
                        setOpen(true);

                    }} ><Edit sx={{ color: "#1976d3" }} /></IconButton>
                    <IconButton onClick={handleClickOpenDelete} ><Delete sx={{ color: "#e50914" }} /></IconButton>
                </Box>
            ),
        },
    ];

    const fetchBrands = async () => {
        try {
            const token = localStorage.getItem('deabreu.token');
            const response = await axios.get("http://localhost:8000/api/brands", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRows(response.data.data);
        } catch (error) {
            console.log("Erro ao buscar os marcas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target as { name: string; value: string };
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            setFormData((prev) => ({
                ...prev,
                logo: selectedFile,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            if (key === "logo" && value) {
                formDataToSend.append("logo", value);
            } else {
                formDataToSend.append(key, value);
            }
        }

        try {
            const token = localStorage.getItem('deabreu.token');

            if (isEditing) {
                formDataToSend.append('_method', 'PUT');
                await axios.post(`http://localhost:8000/api/brands/${editingId}`, formDataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }).then(() => {
                    fetchBrands();
                    setOpenDelete(false);
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                await axios.post("http://localhost:8000/api/brands", formDataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
            }
            handleClose();
            setLoading(true);
            fetchBrands();
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
        }
    };
    return (
        <>
            <Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Lista de Marcas
                    </Typography>
                    <Button variant="contained" onClick={handleClickOpen} sx={{ mb: 2, gap: 1 }}>
                        Adicionar Marca <ControlPoint />
                    </Button>
                </Box>

                <Box sx={{ height: "100%", width: "82vw", overflowX: "scroll" }}>
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
                    />
                </Box>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                {isEditing ? (
                    <DialogTitle>Atualizar Marca </DialogTitle>
                ) : (
                    <DialogTitle>Adicionar Nova Marca</DialogTitle>
                )}
                <DialogContent>
                    <form style={{ paddingTop: "10px" }} onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 12 }}>
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
                                    Escolher Logo
                                </Button>
                            </Grid>
                        </Grid>

                        <DialogActions sx={{ mt: 2 }}>
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
                    <DialogContentText>Tem certeza que deseja excluir esta marca?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete}>Cancelar</Button>
                    <Button color="error" onClick={handleDelete}>Excluir</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}