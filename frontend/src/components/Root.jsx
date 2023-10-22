import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import Loading from '../pages/loading';
import PublicPosts from '../pages/public-data';
import NotFound from '../pages/notFound';
import CreatePost from '../pages/create-post';
import Profile from '../pages/profile';
import { useState, useEffect } from 'react';
import instance from './api/api_instance';
import PostPage from '../pages/postPage';
import GroupSpecific from '../pages/group-specific';
import Groups from '../pages/group-landing';
import CreateGroup from '../pages/create-group';

export default function Root() {
  

  const [AllPosts, setAllPosts] = useState([])
  const [AllGroups, setAllGroups] = useState([])

  

  useEffect(() => {
    if(localStorage.getItem('token') != null){
    async function GetAllPostsIDs() {
      try{ 
        await instance ({
          url: "/post/get_all_objects",
          method: "GET",
      }).then((res) => {
        setAllPosts(res.data)
      });
      } catch(e) { }
    }
    
      GetAllPostsIDs();
    }
    } , 
    [] 
  ) 


  useEffect(() => {
    if(localStorage.getItem('token') != null){
    async function GetAllGroupsIDs() {
      try{ 
        await instance ({
          url: "/groups/get_all_id",
          method: "GET",
      }).then((res) => {
        setAllGroups(res.data)
      });
      } catch(e) {
       }
    }
    GetAllGroupsIDs();
    }} , 
    [] 
  ) 

  let postRoutes = AllPosts.map((post_id) => <Route key={post_id} path={`/analysis/${post_id}`} element = {<PostPage post_id={post_id} />} />);
  let groupRoutes = AllGroups.map((group_id) => <Route key={group_id} path={`/group/${group_id}`} element = {<GroupSpecific group_id={group_id} />} />);

  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/loading" element={<Loading />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/public-data" element={<PublicPosts />} />
          <Route exact path="/create-analysis" element={<CreatePost />} />
          <Route exact path="/groups" element={<Groups />} />
          <Route exact path="/create-group" element={<CreateGroup />} />
          
          {postRoutes}
          {groupRoutes}

          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
}
