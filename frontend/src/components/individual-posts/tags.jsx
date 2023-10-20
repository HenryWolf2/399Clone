import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Stack, Chip } from '@mui/material';

export default function Tags(props) { 
  let newArray = []
  
  if (props.tagArray != null ) {    
    for (var i = 0; i < props.tagArray.length; i++) {
      newArray.push(<Chip key={ i }sx={{ bgcolor: '#02AEEC', color: 'white', p:1 }} label={props.tagArray[i]} />)
    }
  
  }
  
  return (
    <Stack direction="row" spacing={1} sx={{margin: "0px 20px 0px 20px", overflow:"scroll", overflowY:"hidden"}}>
      {newArray}
    </Stack>
  );
}