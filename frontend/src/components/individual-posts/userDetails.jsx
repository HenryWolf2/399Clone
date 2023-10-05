import instance from '../api/api_instance';
import { useState, useEffect } from 'react';


// Will need to be redone once we have data

export default function UserDetails({ specific_id }) {
  const [user, setUser] = useState([])

  useEffect(() => {
    async function GetIndividualInformation() {
      try{ 
        await instance ({
          url: "/user/info",
          method: "GET",
          params: {user_id: specific_id}
      }).then((res) => {
        setUser(res.data)
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetIndividualInformation();
  }, [specific_id])

  return ( {user} );
}