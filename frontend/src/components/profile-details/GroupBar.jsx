import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';


export default function TotalAvatars() {
  return (
    <AvatarGroup total={24}>
      <Avatar alt="Remy Sharp" />
      <Avatar alt="Travis Howard" />
      <Avatar alt="Agnes Walker" />
      <Avatar alt="Trevor Henderson" />
    </AvatarGroup>
  );
}