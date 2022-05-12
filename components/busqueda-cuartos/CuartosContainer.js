import { Grid } from '@mui/material'
import React from 'react'
import { CuartosItem } from './CuartosItem'



export const CuartosContainer = ({rooms}) => {


  return (
    <Grid container spacing={3} sx={{marginTop: 2}}>
    {
        rooms.data.map(room => (
          <Grid key={room._id} item xs={12} sm={4}>
            <CuartosItem habitacion={room}/>
          </Grid>
        ))
      } 
    </Grid>
  )
}
