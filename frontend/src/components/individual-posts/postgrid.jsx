import * as React from 'react';
import IndividualPost from './post';
import { Grid } from '@mui/material';

export default function PostGrid({narrow, post_array}) {
    let arrayDataItems;
    if (narrow) {
        arrayDataItems = post_array.map((post_id) => <Grid item xs={12}><IndividualPost post_id={post_id} /></Grid>);
    } else {
        arrayDataItems = post_array.map((post_id) => <Grid item xs={6}><IndividualPost post_id={post_id} /></Grid>);
    }
    
    console.log(arrayDataItems)
    console.log("wtf")

    return (
        
        <Grid container spacing={2}>{arrayDataItems}</Grid>
        
      );
}