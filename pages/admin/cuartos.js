import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { fileUpload } from '../../utils/fileUpload'


const CuartosHome = () => {

    const [imageState, setImageState] = useState('')

    const [checkedWifi, setCheckedWifi] = useState(false);
    const [checkedParking, setCheckedParking] = useState(false);
    const [checkedTV, setCheckedTV] = useState(false);
    const [checkedAC, setCheckedAC] = useState(false);
    const [checkedCafetera, setCheckedCafetera] = useState(false);

    const handleFileChange = async(e) => {
        let imageUpload = "";
        const file = e.target.files[0]
        
        if(file){
            imageUpload = await fileUpload(file)
            setImageState(imageUpload)
        }
    }

    const handlePictureClick = ()=>{
        document.querySelector('#file').click()
    }

    const newServicesArray = () => {
        let services = []
        services.push(checkedWifi, checkedParking, checkedTV, checkedAC, checkedCafetera)

        let activeServices =  services.map(service => {
            if(service){
                return service
            }
        })
        console.log(activeServices)
        
    }

    useEffect(() => {
        newServicesArray()
    }, [checkedWifi, checkedParking, checkedTV, checkedAC, checkedCafetera])



  return (
    <AdminLayout title={'Hotel Posada Real - Administración'} pageDescription={'Disfruta las mejores vacaciones de tu vida'}>
        <Toolbar/>
        <Container>

            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                        id="standard-basic"
                        label="Nombre"
                        variant="standard"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="standard-basic"
                        label="Descripción"
                        variant="standard"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="standard-basic"
                        label="Precio"
                        variant="standard"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        id="file"
                    />

                    <Button
                        sx={{marginBottom: 2}}
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={handlePictureClick}
                    >Subir Imagen
                    </Button>    
                </Grid>
            </Grid>

            {
                imageState && 
                <img
                    style={{width: "100px"}}
                    src={imageState} alt=""
                />
            }

        </Container>
    </AdminLayout>
  )
}

export default CuartosHome