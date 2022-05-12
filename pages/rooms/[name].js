import { Box, Container, Grid, Paper, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { apiDb } from '../../api/apiDb'
import { MainLayout } from '../../components/layout/MainLayout'
import Image from 'next/image'
import { AcUnit, CoffeeMaker, LocalParking, NetworkWifi, Tv } from '@mui/icons-material'
import { ReservaMain } from '../../components/main/ReservaMain'



const RoomsPage = ({room}) => {

  return (
    <MainLayout title={`Hotel Posada Real - Cuarto ${room.name}`} pageDescription={'Disfruta las mejores vacaciones de tu vida'}>
         <Toolbar />
        <Container>
            <Typography sx={{marginTop: 4}} textAlign="center" variant="h4" component="h1"> Habitación {room.name} </Typography>
            <Grid container spacing={2} sx={{marginTop: 2}}>
                <Grid item xs={6}>
                    <Image 
                        src={room.photos[0].url} 
                        alt="Cuarto"
                        width={750}
                        height={500}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Paper elevation={3} sx={{padding: 3, height: 380}}>
                        <Typography variant="h6" textAlign="center">
                            Detalles del cuarto
                        </Typography>
                        <Typography variant="body1" sx={{marginTop: 2}}>
                            {room.description}
                        </Typography>

                        <Typography variant="subtitle2" sx={{marginTop: 2}}>
                            Precio: ${room.price}
                        </Typography>

                        <Typography variant="h6" textAlign="center" sx={{marginBottom: 2}}>
                            Servicios
                        </Typography>

                        <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                        {
                            room.features.map((feature, index) => {
                                if(feature === 'Wifi') {
                                    return ( 
                                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                            <NetworkWifi key={index} />
                                            <Typography variant="body2">
                                                {feature}
                                            </Typography>
                                        </Box>   
                                    )
                                }
                                if(feature === 'AC') {
                                    return (
                                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                            <AcUnit key={index} /> 
                                            <Typography variant="body2">
                                                {feature}
                                            </Typography>
                                        </Box> 
                                    )
                                }

                                if(feature === 'Cafetera') {
                                    return (
                                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                            <CoffeeMaker key={index} /> 
                                            <Typography variant="body2">
                                                {feature}
                                            </Typography>
                                        </Box> 
                                        
                                    )
                                }

                                if(feature === 'TV') {
                                    return (
                                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                            <Tv key={index} /> 
                                            <Typography variant="body2">
                                                {feature}
                                            </Typography>
                                        </Box> 
                                    )
                                }

                                if(feature === 'Estacionamiento') {
                                    return ( 
                                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                            <LocalParking key={index} /> 
                                            <Typography variant="body2">
                                                Parking
                                            </Typography>
                                        </Box> 
                                    )
                                }
                            })
                        }
                        </Box>
                    </Paper>
                </Grid>
                

                <ReservaMain
                    room={room}
                    typeRouter="confirmacion"
                />

            </Grid>    
        </Container>
    </MainLayout>
    
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths = async (ctx) => {
    const {data} = await  apiDb.get("/rooms");
    
    const roomNames = data.data.map(room => room.name);

    return {
        paths: roomNames.map(roomName => ({
            params: { name: roomName }
        })),
        fallback: "blocking"
    }
}

export const getStaticProps = async ({params}) => {

    const { data } = await  apiDb.get(`/rooms`);

    const room = data.data.find(room => room.name === params.name);

    if(!room){
        return{
          redirect:{
            destination: '/',
            permanent: false
          }
        }
      }
    return {
        props: {
            room
        }
    }
    }



export default RoomsPage