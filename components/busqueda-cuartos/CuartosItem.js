import React, { useContext, useState, useEffect } from 'react'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CardActionArea, Paper } from '@mui/material';
import { ReservationContext } from '../../context';
import { useRouter } from 'next/router';


export const CuartosItem = ({habitacion}) => {

  let dollarUSLocale = Intl.NumberFormat('en-US');

  const {push} = useRouter()

  const { name, description, price, photos, _id} = habitacion;

  const [totalReservation, setTotalReservation] = useState(0)

  const {handleUpdateReservation, reservation} = useContext(ReservationContext)

  const handleTypeOfRoom = () => {
    handleUpdateReservation({room: _id, total: totalReservation, roomName: name})
    push(`/confirmacion-reservacion`)
  }

  useEffect(() => {
    sumReservation()
  }, [price, reservation])
  

  const sumReservation = () => {
    setTotalReservation(parseInt(price * reservation.totalDays * reservation.hosts))
  }

  const handleShowMore = () => {
    push(`/rooms/${name}`)
  }


  return (
    <Paper sx={{ maxWidth: 345, borderRadius:5 }} elevation={3}>
        <CardMedia
          component="img"
          alt="cuarto"
          height="140"
          image={photos[0].url}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="subtitle2" sx={{marginTop: 3}} color="text.secondary">
            {`Total por ${reservation.totalDays} 
            ${reservation.totalDays > 1 ? "dias" : "dia"} y
            ${reservation.hosts} 
            ${reservation.hosts > 1 ? "personas" : "persona"}: $${dollarUSLocale.format(totalReservation)}` }
          </Typography>
        </CardContent>

        <Box display="flex">
          <Typography variant="subtitle2"color="text.primary" 
          sx={{marginLeft: 2, marginBottom: 2, textDecoration: "underline", '&:hover': {
            cursor: "pointer",
        },}}
          onClick={handleShowMore}>
            Ver más
        </Typography>
        </Box>
    
      <Button 
        size="small" 
        variant='contained' 
        color="secondary" 
        fullWidth
        onClick={handleTypeOfRoom}
      >
        Reservar  
      </Button>

    </Paper>
  )
}