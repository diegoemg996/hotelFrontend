import { Container,  Paper, Typography, Grid } from '@mui/material'
import React from 'react'

export const Restaurante = () => {
  return (
    <Container>
        <Grid container >
            <Grid item xs={12} sm={6}>
                <img
                    src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    width="100%"
                    alt='restaurante'
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{
                    padding: '2rem',
                    margin: '2rem'
                }}>
                  <Typography variant="h1" gutterBottom textAlign="center" marginBottom={3} color="#de3163">
                      Restaurante
                  </Typography>
                    <Typography variant="h5" gutterBottom textAlign="justify">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos velit impedit repellat eaque possimus dolorem molestias dolorum tenetur nisi suscipit recusandae excepturi commodi, molestiae distinctio inventore vel. Enim eos ratione eaque modi culpa laudantium.
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    </Container>

  )
}
