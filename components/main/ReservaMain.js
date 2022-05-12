import {  Button, Container, Grid, Box, Paper, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { differenceInDays, isBefore } from 'date-fns';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { ReservationContext } from '../../context';
import { getDatesBetweenDates } from '../../utils/getDatesBetweenDates';
import { Counter } from './Counter';

export const ReservaMain = ({typeRouter, room = {}}) => {

    const [arrive, setArrive] = useState(new Date());
    const [departure, setDeparture] = useState(new Date());
    const [totalDays, setTotalDays] = useState(0);
    const [datesBooked, setdatesBooked] = useState([]);
    const [hosts, setHosts] = useState(1);
    const {handleUpdateReservation} = useContext(ReservationContext)
    const [totalReservation, setTotalReservation] = useState(0)


    const {push} = useRouter()

    useEffect(() => {
      setTotalDays(differenceInDays(departure, arrive)+1)
      setdatesBooked(getDatesBetweenDates(arrive, departure))
    }, [departure, arrive])

    useEffect(() => {
      setTotalReservation(parseInt(room.price * totalDays * hosts))
    }, [totalDays, hosts, room])
  

    const handleBusqueda = () => {

        if(isBefore(departure, arrive)){
          alert("La fecha de salida no puede ser anterior a la fecha de llegada")
          return
        }

        handleUpdateReservation({arrive, departure, hosts, totalDays, datesBooked})

        if(typeRouter === "confirmacion"){
          handleUpdateReservation({room: room._id, total: totalReservation, roomName: room.name})
          push(`/confirmacion-reservacion`)
          return
        }        
        push(`/busqueda-cuartos`)
    }


  return (
      <Paper sx={{padding: 3, background: '#ffe4e8',  width: "100%"}}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Box display={"flex"} justifyContent="center">
                <DatePicker
                  sx={{background: 'white'}}
                  label="Llegada"
                  minDate={new Date()}
                  value={arrive}
                  onChange={(newValue) => {
                  setArrive(newValue);
                  }}
                  renderInput={(props) => <TextField sx={{background: 'white'}}  {...props} size='small' helperText={null} />}
                />
              </Box>
              <Box display={"flex"} justifyContent="center">
                <DatePicker
                  sx={{background: 'white'}}
                  label="Salida"
                  minDate={arrive}
                  value={departure}
                  onChange={(newValue) => {
                  setDeparture(newValue);
                  }}
                  renderInput={(props) => <TextField  sx={{background: 'white'}}  {...props} size='small' helperText={null} />}
                />
              </Box>
              <Box display={"flex"} justifyContent="center">
                <Counter 
                  setHosts={setHosts}
                  hosts={hosts}
                />
              </Box>
              <Box display={"flex"} justifyContent="center">
                <Button color='secondary' onClick={handleBusqueda}>
                  Buscar
                </Button>
              </Box>
          </Box>
      </LocalizationProvider>
      </Paper>
  )
}
