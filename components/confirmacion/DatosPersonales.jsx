import { Alert, Box, Button, Container, Grid, TextField } from '@mui/material'
import React, {useContext, useState, useEffect} from 'react'
import { apiDb } from '../../api/apiDb'
import { AuthContext } from '../../context'
import { useForm } from '../../hooks/useForm'

export const DatosPersonales = ({setThirdDrawer, setValue}) => {

    const {user} = useContext(AuthContext)

    const [message, setMessage] = useState({
        status: '',
        messageInfo: ''
    })

    const [ userDB, setUserDB ] = useState({})

    const getUserData = async () => {
        try {
            const {data} = await apiDb.get(`/usuarios/get-user/${user._id}`)
            setUserDB(data)
        } catch ({response}) {
            console.log("error", response)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])
    

    const [values, handleInputChange] = useForm({
        address: userDB.address || '',
        city: userDB.city || '',
        state: userDB.state || '',
        cellphone: userDB.cellphone || ''
      })

    const handleSubmit = async() => {

        if(!handleValidation()){
            return
        }
        try {
            const editUser =  await apiDb.put(`/usuarios/edit/${user._id}`, {...values})
            setThirdDrawer(false)
            setValue(2)

        } catch ({response}) {
            console.log("error", response)
        }
    }

    const handleValidation = () => {

        if(values.address === "" || values.city === "" || values.state === "" || values.cellphone === ""){
            setMessage({
                status: 'error',
                messageInfo: 'Por favor, llena todos los campos'
            })
            return false
        }else{
            return true
        }
    }

  return (
    <Container>
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={6} marginBottom={2}>
                    <TextField
                        id="standard-basic"
                        label="Nombre"
                        variant="standard"
                        disabled
                        value={user.firstName}
                        fullWidth
                    ></TextField>
                </Grid>
                <Grid item xs={6} marginBottom={2}>
                    <TextField
                        id="standard-basic"
                        label="Apellido"
                        variant="standard"
                        disabled
                        value={user.lastName}
                        fullWidth
                    ></TextField>
                </Grid>
                <Grid item xs={6} marginBottom={2}>
                    <TextField
                        id="standard-basic"
                        label="Domicilio"
                        variant="standard"
                        name='address'
                        onChange={handleInputChange}
                        value={ user.address}
                        fullWidth
                    ></TextField>
                </Grid>
                <Grid item xs={6} marginBottom={2}>
                    <TextField
                        id="standard-basic"
                        label="Ciudad"
                        variant="standard"
                        name='city'
                        onChange={handleInputChange}
                        value={values.city}
                        fullWidth
                    ></TextField>
                </Grid>
                <Grid item xs={6} marginBottom={2}>
                    <TextField
                        id="standard-basic"
                        label="Estado"
                        variant="standard"
                        name='state'
                        onChange={handleInputChange}
                        value={values.state}
                        fullWidth
                    ></TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="standard-basic"
                        label="Celular"
                        variant="standard"
                        name='cellphone'
                        onChange={handleInputChange}
                        value={values.cellphone}
                        fullWidth
                    ></TextField>
                </Grid>

                {
                    message.status === 'error' &&
                    <Grid item xs={12}>
                        <Alert severity={message.status}>{message.messageInfo}</Alert>
                    </Grid>
                }

                <Grid item xs={12} marginBottom={2}>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        fullWidth
                        onClick={handleSubmit}
                    >
                        Guardar
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </Container>

  )
}
