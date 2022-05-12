import { useContext, useState } from 'react';
import {Box, Button, Typography, Modal, TextField, Stack, Alert} from '@mui/material';
import { UiContext, AuthContext } from '../../context';
import { apiDb } from '../../api/apiDb';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

export default function Login() {

  const {closeLogin, isLoginOpen, openRegister} = useContext(UiContext)
  const {handleLogin} = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitLogin = async() => {

    if(email === '' || password === '') {
      setError('Por favor llena todos los campos');
      return;
    }

    try {
      const {data} = await apiDb.post('/usuarios/login', {email, password})
      handleLogin(data)
      handleClose()
    } catch ({response}) {
      setError(response.data.msg)
    }
  }

  const handleToRegister = () => {
    closeLogin()
    openRegister()
    setEmail('')
    setPassword('')
    setError('')
  }


  const handleClose = () => {
    closeLogin()
    setEmail('')
    setPassword('')
    setError('')
  }

  return (
    <div>
      <Modal
        open={isLoginOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography textAlign="center" variant="h4" component="h2" margin={2}>
            Inicia Sesión
          </Typography>

          <Stack spacing={2}>
            <TextField 
              id="outlined-basic" 
              label="Correo" 
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField 
              id="outlined-basic" 
              label="Contraseña"
              type="password"
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Box display="flex">
              <Typography variant="body2" component="p" marginRight="5px">
                 ¿No tienes cuenta aún?
              </Typography>
              <Typography variant="body2" component="p"
                onClick={handleToRegister}
                sx={{textDecoration: "underline", cursor: "pointer", color: "secondary"}}>
                Registrate
              </Typography>
            </Box>
            {
              error && <Alert severity="error">{error}</Alert>
            }

            <Button 
              variant="contained"
              sx={{ marginTop: 2 }}
              color="secondary" 
              onClick={submitLogin}
            >Inicia Sesión</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}