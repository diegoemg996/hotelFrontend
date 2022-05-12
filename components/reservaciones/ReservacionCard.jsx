import { Box, Button, Chip, Grid } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Check, Clear, DoneOutline } from '@mui/icons-material';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

export const ReservacionCard = ({reservacion}) => {

    const {push} = useRouter();

    let dollarUSLocale = Intl.NumberFormat('en-US');

    const handleVerReservacion = () => {
        push(`/reservacion/${reservacion._id}`);
    }



  return (
    <Grid item xs={12} sm={4}>
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
            component="img"
            height="140"
            image={reservacion.idRoom.photos[0].url}
            alt="habitacion"
        />
        <CardContent>
            <Box display="flex" justifyContent="space-between">
                <Typography gutterBottom variant="h6" component="div">
                {`Reservación: ${reservacion.reservationCode}`}
                </Typography>
                {
                    reservacion.isPaid ?
                    <Chip label="pagado" color="success" variant="outlined" icon={<Check/>} /> :
                    <Chip label="pendiente" color="error" variant="outlined" icon={<Clear/>} />
                }
            </Box>
            <Typography variant="body2" color="textSecondary" component="p">
                {`Habitación: ${reservacion.idRoom.name}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {`Numero Habitación: #${reservacion.roomBooked.number}, piso ${reservacion.roomBooked.floor}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {`Huespedes: ${reservacion.hosts}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {`Dias: ${reservacion.days}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {`Fecha de entrada: ${format(new Date (reservacion.arriveDate), "dd/MM/yyyy")}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {`Fecha de salida: ${format(new Date (reservacion.leaveDate), "dd/MM/yyyy")}`}
            </Typography>
            <Box display="flex" justifyContent="space-between" sx={{marginTop: 1}}>
                <Typography variant="subtitle1" color="textSecondary" component="p">
                    {`Total: $${dollarUSLocale.format(reservacion.totalPaid)}`}
                </Typography>
                <Button variant="contained" color="secondary" onClick={handleVerReservacion}>
                    Ver más
                </Button>
            </Box>
        </CardContent>
        </Card>
    </Grid>
  )
}
