import instance from '../api/api_instance';
import { useState, useEffect } from 'react';



export default function UserDetails(user_id) {
  const [user, setUser] = useState([])
  useEffect(() => {
    async function GetIndividualInformation() {
      try{ 
        await instance ({
          url: "/user/info",
          method: "GET",
          params: {user_id: user_id}
      }).then((res) => {
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