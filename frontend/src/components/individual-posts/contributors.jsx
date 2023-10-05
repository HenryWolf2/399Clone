import React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import UserDetails from './userDetails';


// Will need to be redone once we have data

export default function Contributors(collaborators) {
  let collaboratorsArray = collaborators.collaborators
  let IndividualArray = []
  let collaboratorsAvatarsV2 = [];
  
  for (let i = 0; i < collaboratorsArray.length; i++) {
    IndividualArray = UserDetails(collaboratorsArray[i]);
    collaboratorsAvatarsV2.push(<Avatar id={collaboratorsArray[i]} alt={IndividualArray[0]} src={IndividualArray[1]} />);
  }

  return (
    <AvatarGroup max={4}>
      {collaboratorsAvatarsV2}
    </AvatarGroup>
  );
}