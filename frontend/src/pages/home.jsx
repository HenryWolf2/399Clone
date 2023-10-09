import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import PublicNavigationBar from '../components/PublicNavigationBar';
import PostGrid from '../components/individual-posts/postgrid';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import instance from '../components/api/api_instance';
import Box from '@mui/material/Box';



import '../assets/styles/global.css';

export default function Home() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/profile");;
  // },[])
  const [PublicPosts, setPublicPosts] = useState([])

  useEffect(() => {
    async function GetPublicPostsIDs() {
      try{ 
        await instance ({
          // Set URL to get all posts by ID
          url: "/post/get_all",
          method: "GET",
      }).then((res) => {
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
      
      <div style={{height: '85px',display:'flex'}}>
          <div style={{flex:1, flexDirection: 'row', height: '100%', }}>
            <h1 style={{textAlign: 'center', color:'black', paddingRight:"60px"}}>Information</h1>
          </div>
          <div style={{flex:1, flexDirection: 'row', height: '100%',}}>
            <h1 style={{textAlign: 'center', color:'black', paddingRight:"60px"}}>Trending Posts</h1>
          </div>
      </div>

      <div style= {{height: "800px"}}>
        <div style={{ display: 'flex', flexDirection: 'row', height: '100%',}}>
          <div className= "landing-post-container" style={{ borderRight: 'solid', borderColor: "#D9D9D9"}}>
            <Box sx={{ flexGrow: 1,}}>
              <div className= "landing-desc-box">
                <p className= "landingText">
                  Mass spectrometry is a powerful analytical technique that has revolutionized research and analysis in various fields. From determining the structure of complex molecules to identifying unknown compounds, mass spectrometry offers countless possibilities and applications. With the ability to provide both qualitative and quantitative data, researchers can gain valuable insights into the chemical composition of substances.
                </p>
                <p className= "landingText">
                  Our platform takes mass spectrometry to the next level by providing an innovative environment for storing, sharing, and analyzing mass spectrometry data. Through advanced data analysis tools, researchers can perform various analytical techniques, making the most out of their mass spectrometry experiments. Our intuitive interface ensures easy navigation, even for users new to mass spectrometry, allowing everyone to explore the fascinating world of mass spectrometry research.
                </p>
                <p className='landingText'>
                  Collaboration and data sharing are at the heart of our platform. By creating profiles, researchers can connect with like-minded individuals, form research groups, and share their analyzed data securely. Imagine the possibilities of collaborating with experts from different fields, pooling your knowledge, and collectively advancing research in mass spectrometry. Our platform facilitates this collaboration, fostering new ideas and driving innovation.
                </p>
                <p className= "landingText">
                  In addition to a collaborative environment, our platform offers unique features and tools specifically designed for mass spectrometry researchers. Easily upload your data, add contributors, and keep track of your experiments and findings. Share your data within research groups, allowing for real-time discussions and feedback. Our platform also provides comprehensive analytical tools and visualizations to help you gain actionable insights and present your findings with utmost clarity.
                </p>
                <p className= "landingText">
                  Don't miss out on this opportunity to join a vibrant community of mass spectrometry researchers. Register now and unlock the endless possibilities for collaboration, data sharing, and analysis on our platform. Together, let's push the boundaries of mass spectrometry research and make groundbreaking discoveries! 
                </p>
              </div>
            </Box>
          </div>
          <div className= "landing-post-container" style= {{flex: 1, marginTop: "20px", marginBottom:"20px", marginLeft:"60px", marginRight:"60px" }}>
            <PostGrid narrow={true} post_array={PublicPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}