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
import IndividualPost from './individual-posts/post';
import { useState, useEffect } from 'react';
import instance from './api/api_instance';
import PostPage from '../pages/postPage';
import SpecificGroup from '../pages/group-specific';
import Groups from '../pages/group-landing';
import CreateGroup from '../pages/create-group';
import GroupDetails from './group-details/GroupDetails';

export default function Root() {
  /* Unsure if this section here is needed but going to keep it for now */
  const routes = [
    { path: '/', name: 'Home', Component: Home, exact: true },
    { path: '/login', name: 'Login', Component: Login, exact: false },
    { path: '/loading', name: 'Loading', Component: Loading, exact: false },
    { path: '/register', name: 'Register', Component: Register, exact: false },
    { path: '/profile', name: 'Profile', Component: Profile, exact: false },
    { path: '/public-data', name: 'PublicPosts', Component: PublicPosts, exact: false },
    { path: '/create-post', name: 'Create Post', Component: CreatePost, exact: false},
    { path: '/group-specific', name: 'Specific Group', Component: SpecificGroup, exact: false},
    { path: '/create-group', name: 'Create Group', Component: CreateGroup, exact: false},
    { path: '*', name: 'No Match', Component: NotFound, exact: false },
  ];

  const [AllPosts, setAllPosts] = useState([])
  const [AllGroups, setAllGroups] = useState([])

  useEffect(() => {
    async function GetAllPostsIDs() {
      try{ 
        await instance ({
          // Set URL to get all posts by ID
          url: "/post/get_all_objects",
          method: "GET",
      }).then((res) => {
        setAllPosts(res.data)
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetAllPostsIDs();
    } , // <- function that will run on every dependency update
    [] // <-- empty dependency array
  ) 

  // Change this endpoint to a new one that gets all the groups ID's
  // It should work as soon as we change that :D

  useEffect(() => {
    async function GetAllGroupsIDs() {
      try{ 
        await instance ({
          url: "/groups/get_all_id",
          method: "GET",
      }).then((res) => {
        setAllGroups(res.data)
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetAllGroupsIDs();
    } , // <- function that will run on every dependency update
    [] // <-- empty dependency array
  ) 

  let postRoutes = AllPosts.map((post_id) => <Route key={post_id} path={`/post/${post_id}`} element = {<PostPage post_id={post_id} />} />);
  let groupRoutes = AllGroups.map((group_id) => <Route key={group_id} path={`/group/${group_id}`} element = {<SpecificGroup group_id={group_id} />} />);

  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/loading" element={<Loading />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/public-data" element={<PublicPosts />} />
          <Route exact path="/create-post" element={<CreatePost />} />
          <Route exact path="/group-specific" element={<SpecificGroup />} />
          <Route exact path="/groups" element={<Groups />} />
          <Route exact path="/create-group" element={<CreateGroup />} />
          
          {postRoutes}
          {groupRoutes}

          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
}
