import { Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline, UpdateRounded } from '@mui/icons-material';
import { useState } from 'react';


export const Counter = ({setHosts, hosts}) => {

    const handleAdd = () => {
        if(hosts >= 5){
            return;
        }
        setHosts(hosts +1)
    }

    const handleRemove = () => {
        if (hosts === 1){
            return;
        }
        setHosts(hosts - 1)
    }

  return (
    <Box display='flex' alignItems='center'>
        <Typography variant='subtitle2' >Huespedes</Typography>
        <IconButton
            onClick={handleRemove}
        >
            <RemoveCircleOutline color='secondary'/>
        </IconButton>
        <Typography sx={{ width: 20, textAlign:'center' }}> {hosts} </Typography>
        <IconButton
            onClick={handleAdd}
        >
            <AddCircleOutline color='secondary'/>
        </IconButton>
    </Box>
  )
}
