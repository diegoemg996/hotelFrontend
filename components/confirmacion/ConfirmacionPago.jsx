import { CheckCircleOutline } from '@mui/icons-material';
import { Alert, Box, Button, CircularProgress, Container, Grid, Modal, TextField, Typography } from '@mui/material'
import { Visa, Mastercard } from 'grommet-icons';
import React, { useContext, useEffect, useState } from 'react'
import { apiDb } from '../../api/apiDb';
import { ReservationContext, AuthContext } from '../../context';
import { useForm } from '../../hooks/useForm';
import { getTypeCard } from '../../utils/getTypeCard';
import { useRouter } from 'next/router';
import confetti from 'canvas-confetti';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 1,
    borderRadius: 5,
    p: 4,
  };

export const ConfirmacionPago = () => {

    const {push} = useRouter();
    const [typeCard, setTypeCard] = useState('')
    const [cardNumber, setCardNumber] = useState('5552983744875475')
    const [validation, setValidation] = useState(false)
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  

    const {reservation} = useContext(ReservationContext)
    const {user} = useContext(AuthContext)

    const [values, handleInputChange] = useForm({
        name: '',
        expDate: '',
        cvv: '',
    })

    useEffect(() => {
        setTypeCard(getTypeCard(cardNumber))
    }, [cardNumber])

    const handleMakeReservation = () => {

        const preTotal = {
            idRoom: reservation.room,
            days: reservation.totalDays,
            hosts: reservation.hosts
        }

        const reservationData = {
            idUser: user._id,
            idRoom: reservation.room,
            days: reservation.totalDays,
            hosts: reservation.hosts,
            arriveDate: reservation.arrive,
            leaveDate: reservation.departure,
            datesBooked: reservation.datesBooked,
            card: cardNumber
/*             card: {
                cardNumber,
                cardHolder: values.name,
                expirationDate: values.expDate,
                cvv: values.cvv
            } */
        }

        if(cardNumber === '' || values.name === '' || values.expDate === '' || values.cvv === '') {
            setError('Por favor llena todos los campos')
            return;
        }

        apiDb.post('/reservation/total-to-pay', {...preTotal})
        .then(({data}) => {
            apiDb.post('/reservation', {...reservationData, totalPaid: data.total})
            .then(({data}) => {
                handleOpen()
                handleTimeout()
                setError('')
            })
            .catch(({response}) => {
                setError(response.data.msg)
            })
         })
        .catch(({response}) => { console.log("err", response) })

    }

    const handleTimeout = () => {
        setTimeout(() => {
            setValidation(true)
            confetti({
                zIndex:999,
                particleCount: 100,
                spread: 360,
                angle: -100,
                origin: {
                     y: 0.6 
                }
              })
        }, 2000)
    }



  return (
    <>
     <Container>
        <Grid container spacing={3}>
            <Grid item xs={8} marginBottom={1}>
                <TextField
                    id="standard-basic"
                    label="Nombre del titular"
                    variant="standard"
                    fullWidth
                    value={values.name}
                    onChange={handleInputChange}
                    name='name'
                ></TextField>
            </Grid>
            <Grid item xs={8} marginBottom={2}>
                <TextField
                    id="standard-basic"
                    label="Numero de tarjeta"
                    variant="standard"
                    fullWidth
                    onChange={(e) => setCardNumber(e.target.value)}
                    value={cardNumber}
                ></TextField>
            </Grid>
            <Grid item xs={4} marginBottom={1}>
                {
                    typeCard === 'VISA' 
                    ? <Visa color='plain' size='large' />
                    : typeCard === 'MASTERCARD' ? <Mastercard color='plain' size='large' />
                    : null
                }  
            </Grid>

            <Grid item xs={4} marginBottom={1}>
                <TextField
                    id="standard-basic"
                    label="Fecha de expiracion"
                    variant="standard"
                    fullWidth
                    value={values.expDate}
                    onChange={handleInputChange}
                    name='expDate'
                ></TextField>
            </Grid>

            <Grid item xs={4} marginBottom={1}>
                <TextField
                    id="standard-basic"
                    label="CVV"
                    variant="standard"
                    maxLength={3}
                    type='number'
                    fullWidth
                    value={values.cvv}
                    onChange={handleInputChange}
                    name='cvv'
                ></TextField>
            </Grid>

            <Grid item xs={8} marginBottom={2}>
                {
                error && <Alert severity="error" sx={{marginBottom: 2}}>{error}</Alert>
                }
                <Button 
                    variant="contained" 
                    color="secondary" 
                    fullWidth
                    onClick={handleMakeReservation}
                >
                    Pagar
                </Button>
            </Grid>
        </Grid>
        </Container>

        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2" textAlign="center">
            Validando Pago
          </Typography>

          {
              !validation ?
              <Box sx={{display: "flex", justifyContent:"center"}}>
                <CircularProgress color="secondary" sx={{margin: 5}} />
              </Box>
              :
                <Box sx={{display: "flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
                    <Typography id="modal-modal-title" variant="body1"  textAlign="center">
                        Reservación realizada con exito
                    </Typography>

                    <CheckCircleOutline
                        sx={{color: "#b76e79", fontSize: "5rem", margin: 1}}
                        size="large"
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => push(`/reservaciones/${user._id}`)}
                    >Ver reservaciones
                    </Button>
                </Box>
          }
        </Box>
      </Modal>

    
    </>

  )
}
