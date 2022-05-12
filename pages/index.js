import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { ImageSlider } from '../components/ui';
import { ReservaMain } from '../components/main/ReservaMain';
import { Box, Container } from '@mui/material';
import { Servicios } from '../components/main/Servicios';
import { Restaurante } from '../components/main/Restaurante';
import { Alberca } from '../components/main/Alberca';
import { Spa } from '../components/main/Spa';
import { Gym } from '../components/main/Gym';

const Home = () => {  
  
  return (
    <MainLayout title={'Hotel Posada Real - Home'} pageDescription={'Disfruta las mejores vacaciones de tu vida'}>
        <ImageSlider/>
        <Box
          sx={{
/*             backgroundImage: `url(/pattern.webp)`,
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center', */
            paddingY: '3rem',
            boxSizing: "border-box"
          }}
        >
        <Container>
          <ReservaMain/>
        </Container>

        <Servicios/>
        <Restaurante/>
        <Alberca/>
        <Spa/>
        <Gym/>
        

        </Box>
    </MainLayout>
  )
}

export default Home
