import { useContext, useState } from 'react';
import {Box, Button, Typography, Modal, TextField, Stack, Alert} from '@mui/material';
import { UiContext, AuthContext } from '../../context';
import { apiDb } from '../../api/apiDb';
import { useRouter } from 'next/router';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border : '1px solid #ccc',
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

export default function SignIn() {

  const {isRegisterOpen, closeRegister, openLogin} = useContext(UiContext)
  const {handleLogin} = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const submitRegister = async() => {

    if(email === '' || password === '' || firstName === '' || lastName === '') {
      setError('Por favor llena todos los campos');
      return;
    }

    try {
      const {data: dataLogin} = await apiDb.post('/usuarios/', {email, password, firstName, lastName})

      if(dataLogin.ok){
        const {data} = await apiDb.post('/usuarios/login', {email, password})
        handleLogin(data)
        handleClose()
      }
    } catch ({response}) {
      setError(response.data.msg)
    }
  }

  const handleToLogin = () => {
    closeRegister()
    openLogin()
    setEmail('')
    setPassword('')
    setError('')
  }


  const handleClose = () => {
    closeRegister()
    setEmail('')
    setPassword('')
    setError('')
    setFirstName('')
    setLastName('')
  }

  return (
    <div>
      <Modal
        open={isRegisterOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography textAlign="center" variant="h4" component="h2" margin={2}>
            Crear cuenta
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
              variant="standard"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField 
              id="outlined-basic" 
              label="Nombre" 
              variant="standard"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <TextField 
              id="outlined-basic" 
              label="Apellido" 
              variant="standard"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />



            <Box display="flex">
              <Typography variant="body2" component="p" marginRight="5px">
                 ¿Ya tienes cuenta?
              </Typography>
              <Typography variant="body2" component="p"
                onClick={handleToLogin}
                sx={{textDecoration: "underline", cursor: "pointer", color: "secondary"}}>
                Inicia Sesión
              </Typography>
            </Box>
            {
              error && <Alert severity="error">{error}</Alert>
            }
            <Button 
              variant="contained"
              sx={{ marginTop: 2 }}
              color="secondary" 
              onClick={submitRegister}
            >Crear Cuenta</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}