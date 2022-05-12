import { Toolbar, Container, Typography, Grid } from '@mui/material'
import React from 'react'
import { apiDb } from '../../api/apiDb'
import { MainLayout } from '../../components/layout/MainLayout'
import { ReservacionCard } from '../../components/reservaciones/ReservacionCard'

const ReservacionPage = ({reservations}) => {

  const {data} = reservations;

  return (
    <MainLayout title={'Hotel Posada Real - Mis reservaciones'} pageDescription={'Disfruta las mejores vacaciones de tu vida'}>
        <Toolbar/>
        <Container>
        <Typography sx={{margin: 3}} textAlign="center" variant="h4" component="h1"> Mis reservaciones</Typography>

        {
          data.length > 0 ? (
            <Grid container spacing={3} sx={{marginTop: 2}}>
            {
              data.map(reservacion => (
                <ReservacionCard 
                  key={reservacion._id}
                  reservacion={reservacion}
                />
              ))
            } 
            </Grid>
          ) : (
            <Typography sx={{margin: 3}} textAlign="center" variant="h5" component="h1"> 
              Actualmente no tienes ninguna reservación.
            </Typography>
          )
        }
        </Container>
    </MainLayout>
  )
}


export const getServerSideProps = async ({params}) => {

  
    const {data} = await  apiDb.get(`/reservation/search/${params.id}`)

    return {
        props: {
            reservations: data
        }
    }
}

export default ReservacionPage