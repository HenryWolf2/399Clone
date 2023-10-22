import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import instance from '../api/api_instance';


export default function ProfilePicture(props) {
  const [profilePicture, setProfileImage] = useState('')

  useEffect(() => {
    if (props.author !== "") {
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
      } }, 
      [props.author] 
  )
  return (
    <>
      {profilePicture ? (
        <Avatar src={instance.defaults.baseURL.replace("/api", "") + profilePicture} />
      ) : (
        <Avatar />
      )}
    </>
  );
}