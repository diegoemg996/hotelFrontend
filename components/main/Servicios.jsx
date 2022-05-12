import { FitnessCenter,  Pool, Restaurant, Spa } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

export const Servicios = () => {
  return (
    <Box
        sx={{
            width: '100%',
            backgroundColor: 'secondary.main',
            color: 'white',
            padding: '5rem',
            marginY: '3rem',
            
        }}
    >
        <Typography variant="h1" gutterBottom textAlign="center" marginBottom={3}>
            Servicios
        </Typography>

        <Box display="flex" justifyContent="space-evenly">

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Restaurant sx={{fontSize: '4rem'}}/>
                <Typography variant="h6" gutterBottom textAlign="center">
                    Restaurante
                </Typography>
            </Box>

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Pool sx={{fontSize: '4rem'}}/>
                <Typography variant="h6" gutterBottom textAlign="center">
                    Alberca 
                </Typography>
            </Box>

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Spa sx={{ fontSize: '4rem'}}/>
                <Typography variant="h6" gutterBottom textAlign="center">
                    Spa
                </Typography>
            </Box>

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <FitnessCenter sx={{fontSize: '4rem'}}/>
                <Typography variant="h6" gutterBottom textAlign="center">
                    Gym
                </Typography>
            </Box>
        </Box>
    </Box>
  )
}
