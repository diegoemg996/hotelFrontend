
import React, { useContext } from 'react'
import { Button,  Divider,  Grid, Paper, Typography, Box } from '@mui/material'
import { ImageSlider } from '../ui'
import { ReservationContext, UiContext, AuthContext } from '../../context'
import { format } from 'date-fns'


export const Resumen = ({setSecondDrawer, setValue}) => {

    let dollarUSLocale = Intl.NumberFormat('en-US');

    const {reservation} = useContext(ReservationContext)
    const {openLogin} = useContext(UiContext)
    const {isLoggedIn} = useContext(AuthContext)

    const handleClick = () => {

        if(!isLoggedIn){
            openLogin()
        }else{
            setSecondDrawer(false)
            setValue(1)
        }
    }

  return (
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

            <Paper elevation={3} sx={{padding: 3}} >

                <Box display="flex" justifyContent="space-between" alignItems="center" paddingX={3} marginBottom={1}>
                    <Typography variant="h6" textAlign="center">
                        Tipo de Habitación: 
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                        {reservation.roomName}
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" paddingX={3} marginBottom={1}>
                    <Typography variant="h6" textAlign="center">
                    Fecha de llegada: 
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                        {format(new Date(reservation.arrive), "dd/MM/yyyy")}
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" paddingX={3} marginBottom={1}>
                    <Typography variant="h6" textAlign="center">
                    Fecha de salida: 
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                        {format(new Date (reservation.departure), "dd/MM/yyyy")}
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" paddingX={3} marginBottom={1}>
                    <Typography variant="h6" textAlign="center">
                    Huespedes: 
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                        {reservation.hosts}
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" paddingX={3} marginBottom={1}>
                    <Typography variant="h6" textAlign="center">
                    Total de dias: 
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                        {reservation.totalDays}
                    </Typography>
                </Box>
                <Divider/>

                <Box display="flex" justifyContent="space-between" alignItems="center" paddingX={3} marginY={2}>
                    <Typography variant="h6" textAlign="center">
                    Total: 
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                    {`$${dollarUSLocale.format(reservation.total)}`}
                    </Typography>
                </Box>



                <Button 
                    variant="contained" 
                    color="secondary" 
                    fullWidth sx={{marginTop:3}}
                    onClick={handleClick}
                >
                    Reservar
                </Button>

            </Paper>
        </Grid>
    </Grid>
  )
}
