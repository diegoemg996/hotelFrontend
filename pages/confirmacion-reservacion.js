/* import { Button, Container, Grid, Paper, Toolbar, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { MainLayout } from '../components/layout/MainLayout';
import { ImageSlider } from '../components/ui';
import { ReservationContext } from '../context';



const ReservacionPage = () => {

  const {reservation} = useContext(ReservationContext)

  return (
    <MainLayout title={'Hotel Posada Real - Reservacion'} pageDescription={'Disfruta las mejores vacaciones de tu vida'}>
      <Toolbar />
        <Container>
          <Typography sx={{margin: 4}} textAlign="center" variant="h4" component="h1"> Tu reservación </Typography>

          <Grid container spacing={3}>
            <Grid item xs={7}>
              <ImageSlider
                type={'small'}
              />
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h6" textAlign="center">
                Detalles de la reservación
              </Typography>

              <Paper elevation={3} sx={{padding: 3}}>

                <Button variant="contained" color="secondary" fullWidth >
                  Reservar
                </Button>

              </Paper>
            </Grid>
          </Grid>
        </Container>
    </MainLayout>
  )
}

export default ReservacionPage */

import {Typography, Tabs, Tab, Box, Toolbar, Container  } from '@mui/material';
import { MainLayout } from '../components/layout/MainLayout';
import { Resumen } from '../components/confirmacion/Resumen';
import{ useContext, useState } from 'react';
import { ReservationContext } from '../context';
import { DatosPersonales } from '../components/confirmacion/DatosPersonales';
import { ConfirmacionPago } from '../components/confirmacion/ConfirmacionPago';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function ReservacionPage() {

  const [value, setValue] = useState(0);

  const [secondDrawer, setSecondDrawer] = useState(true);
  const [thirdDrawer, setThirdDrawer] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {isReservationMade} = useContext(ReservationContext)

  return (
    <MainLayout title={'Hotel Posada Real - Confirma reservación'} pageDescription={'Disfruta las mejores vacaciones de tu vida'}>
      <Toolbar />
        <Container>
          <Typography sx={{margin: 3}} textAlign="center" variant="h4" component="h1"> Tu reservación </Typography>

          {
            isReservationMade ? (
              <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Confirmación"  {...a11yProps(0)} />
                  <Tab label="Datos Personales" disabled={secondDrawer} {...a11yProps(1)} />
                  <Tab label="Información de Pago" disabled={thirdDrawer} {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Resumen
                  setSecondDrawer={setSecondDrawer}
                  setValue={setValue}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <DatosPersonales
                  setThirdDrawer={setThirdDrawer}
                  setValue={setValue}
                />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <ConfirmacionPago/>
              </TabPanel>
            </Box>
            )
            : (

              <Typography sx={{margin: 3}} textAlign="center" variant="h5"> Lo sentimos no hay reservaciones disponibles </Typography>

            )
          }
        </Container>
    </MainLayout>

  );
}

export default ReservacionPage