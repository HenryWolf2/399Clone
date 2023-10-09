import instance from '../api/api_instance';
import { useState, useEffect } from 'react';


// Will need to be redone once we have data

export default function UserDetails(user_id) {
  const [user, setUser] = useState([])
  console.log(user_id)
  useEffect(() => {
    async function GetIndividualInformation() {
      try{ 
        await instance ({
          url: "/user/info",
          method: "GET",
          params: {user_id: user_id}
      }).then((res) => {
        console.log(res.data)
        setUser(res.data)
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetIndividualInformation();
  }, [user_id])

  return ( 
    {user} 
  );
}