'use client';

import { SyntheticEvent, useCallback, useRef, useState } from 'react';
import axios from 'axios';
import logo from "../../../../public/images/logo4.png";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { TextField, Button, Snackbar, Alert, CircularProgress, Box, Typography, Paper } from '@mui/material';

export default function Login() {
  const router = useRouter();
  const refForm = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const submitForm = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();

      if (refForm.current?.checkValidity()) {
        const formData = new FormData(refForm.current);
        const email = formData.get("email") as string;
        const password = formData.get("senha") as string;

        setIsLoading(true);
        try {
          const resposta = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/login', { email, password });
          const { token, nome, usuario_id } = resposta.data;
          const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
          localStorage.setItem('deabreu.token', token);
          localStorage.setItem('deabreu.nome', nome);
          localStorage.setItem('deabreu.usuario_id', usuario_id);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          router.push('/');
        } catch (error) {
          console.error("Erro ao fazer login:", error);
          setSnackbarMessage("Erro ao fazer login. Verifique suas credenciais.");
          setSnackbarOpen(true);
          setIsLoading(false);
        }
      } else {
        refForm.current?.classList.add('was-validated');
      }
    },
    [router]
  );

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Image src={logo} alt="" width={250} />
          <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2 }}>
            Preencha os campos para logar
          </Typography>
        </Box>

        <form ref={refForm} noValidate onSubmit={submitForm}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            name="email"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Senha"
            type="password"
            name="senha"
            required
            variant="outlined"
          />
          <Box mt={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Entrar'}
            </Button>
          </Box>
        </form>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
