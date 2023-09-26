
import * as React from 'react';
import { Grid } from '@mui/material';
import GroupCard from './group-card';

export default function GroupGrid(group_array) {
    console.log(group_array)
    let arrayDataItems = group_array.group_array.map((group_id) =>    <Grid item xs={12}> <GroupCard group_id={group_id} /> </Grid>);
    return (       
        <Grid container spacing={2}>{arrayDataItems}</Grid> 
      );
}