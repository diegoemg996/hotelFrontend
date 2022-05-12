import { Box, Container, Grid, Paper, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { apiDb } from '../../api/apiDb'
import { MainLayout } from '../../components/layout/MainLayout'
import { getCurrencyFormat } from '../../utils/getCurrencyFormat'


const HomeReservación = ({reservation}) => {

  return (
    <MainLayout title={'Hotel Posada Real - Reservación'} pageDescription={'Disfruta las mejores vacaciones de tu vida'}>
        <Toolbar/>
        <Container>
            <Typography sx={{marginTop: 4}} textAlign="center" variant="h4" component="h1"> 
                Tu Reservación - {reservation.reservationCode}
            </Typography>

            <Grid container spacing={2} sx={{marginTop: 2}}>
                <Grid item xs={6}>
                    <img src={reservation.idRoom.photos[0].url} alt="Cuarto" width="100%" />
                </Grid>

                <Grid item xs={6}>
                    <Paper elevation={3} width="100%" sx={{padding: 3}}>
                        <Typography variant="h5" component="h2" textAlign="center" marginBottom={1}>
                            Detalles Habitación
                        </Typography>
                        <Box sx={{display: 'flex', justifyContent: "space-evenly", marginBottom: 1}}>
                            <Typography variant="body1" component="h1">
                                Habitación: {reservation.idRoom.name}
                            </Typography>
                            <Typography variant="body1" component="h2">
                                Precio: {getCurrencyFormat(reservation.idRoom.price)}
                            </Typography>
                            <Typography variant="body1" component="h3">
                                Numero de habitación: {reservation.roomBooked.number}
                            </Typography>
                            <Typography variant="body1" component="h3">
                                Piso: {reservation.roomBooked.floor}
                            </Typography>
                        </Box>
                        <Typography variant="h5" component="h2" textAlign="center">
                            Detalles Habitación
                        </Typography>
                        <Box sx={{display: 'flex', justifyContent: "space-evenly"}}>
                            <Typography variant="body1" component="h1">
                                Habitación: {reservation.idRoom.name}
                            </Typography>
                            <Typography variant="body1" component="h2">
                                Precio: {getCurrencyFormat(reservation.idRoom.price)}
                            </Typography>
                            <Typography variant="body1" component="h3">
                                Numero de habitación: {reservation.roomBooked.number}
                            </Typography>
                            <Typography variant="body1" component="h3">
                                Piso: {reservation.roomBooked.floor}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </MainLayout>
  )
}

export const getServerSideProps = async ({params}) => {

  
    const {data} = await  apiDb.get(`/reservation/${params.id}`)

    return {
        props: {
            reservation: data.data
        }
    }
}

export default HomeReservación