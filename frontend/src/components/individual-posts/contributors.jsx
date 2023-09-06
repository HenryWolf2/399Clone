import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';


// Will need to be redone once we have data

export default function Contributors() {
  return (
    <AvatarGroup max={4}>
      <Avatar alt="Remy Sharp" />
      <Avatar alt="Travis Howard" />
      <Avatar alt="Cindy Baker" />
      <Avatar alt="Agnes Walker" />
      <Avatar alt="Trevor Henderson" />
    </AvatarGroup>
  );
}