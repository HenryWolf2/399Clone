import React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import instance from '../api/api_instance';
import { useState, useEffect } from 'react';

export default function Contributors(props) {
  const [users, setUsers] = useState([]);
  const collaboratorsArray = props.collaborators;
  
  useEffect(() => {
    async function GetIndividualInformation(user_id) {
      try{ 
        await instance ({
          url: "user/info",
          method: "GET",
          params: { 
            user_id: user_id 
          }
        }).then((res) => {
          setUsers(prevUsers => [...prevUsers, res.data]);
        });
      } catch(e) {
        console.error(e)
      }
    }

    Promise.all(collaboratorsArray.map(user_id => GetIndividualInformation(user_id)))
  }, [collaboratorsArray]);
  

  const collaboratorsAvatarsV2 = users?.map((user, i) => 
    <Avatar key={i} id={user.id} alt={user.name} src={instance.defaults.baseURL.replace("/api", "") + user.profile_pic} />
  );

  return (
    <AvatarGroup max={4}>
      {collaboratorsAvatarsV2}
    </AvatarGroup>
  );
}