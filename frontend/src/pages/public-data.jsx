import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import IndividualPost from '../components/individual-posts/post';
import instance from '../components/api/api_instance';
import { useEffect } from 'react';
import PostGrid from '../components/individual-posts/postgrid';

export default function Post() {
  const [PublicPosts, setPublicPosts] = useState([])

  useState(() => {
    async function GetPublicPostsIDs() {
      try{ 
        await instance ({
          // Set URL to get all posts by ID
          url: "/post/get_all",
          method: "GET",
      }).then((res) => {
        console.log(res.data)
        setPublicPosts(res.data)
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetPublicPostsIDs();
    } , // <- function that will run on every dependency update
    [] // <-- empty dependency array
  ) 



  return (
    <div className="container">
      <NavigationBar />
      <h1> POST TEST PAGE </h1>
      <PostGrid narrow={false} post_array={PublicPosts} />
      <IndividualPost post_id={1} />
    </div>
  );
}