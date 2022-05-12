import { Container, dividerClasses, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { CuartosContainer } from '../components/busqueda-cuartos/CuartosContainer';
import { MainLayout } from '../components/layout/MainLayout';
import { FullScreenLoading } from '../components/ui/FullScreenLoading';
import { useRooms } from '../hooks/useRooms';


const BusquedaCuartos = () => {

  const {rooms, isLoading} = useRooms('/rooms')

  return (
    <MainLayout title={'Hotel Posada Real - Cuartos Disponibles'} pageDescription={'Disfruta las mejores vacaciones de tu vida'}>
      <Toolbar />
        <Container>
          <Typography sx={{marginTop: 4}} textAlign="center" variant="h4" component="h1"> Habitaciones disponibles </Typography>
          {
            isLoading ? <FullScreenLoading/> : <CuartosContainer rooms={rooms}/>
          }
        </Container>
    </MainLayout>
  )
}

export default BusquedaCuartos