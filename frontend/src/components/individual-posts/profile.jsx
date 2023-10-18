import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useEffect, useState } from 'react';
import instance from '../api/api_instance';

// Will need to be redone once we have data

export default function ProfilePicture(props) {
  const [profilePicture, setProfileImage] = useState('')

  useEffect(() => {
    async function GetIndividualInformation() {
      try{ 
        await instance ({
          url: "user/info",
          method: "GET",
          params: { 
            user_id: props.author 
          }
        }).then((res) => {
          setProfileImage(res.data.profile_pic);
        });
      } catch(e) {
        console.error(e)
      }
    }
    GetIndividualInformation();
    } , // <- function that will run on every dependency update
    [] // <-- empty dependency array
  )

  return (
    <Avatar src={instance.defaults.baseURL.replace("/api", "") + profilePicture} />
  );
}