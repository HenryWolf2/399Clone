import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import PostGrid from '../components/individual-posts/postgrid';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import instance from '../components/api/api_instance';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';



import '../assets/styles/global.css';

export default function Home() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/profile");;
  // },[])
  const [PublicPosts, setPublicPosts] = useState([])
  const BibTeX = `
@article{Long2023adducthunter,
title = {AdductHunter: Identifying Protein-Metal Complex Adducts in Mass Spectra},
author = {Derek Long and Liam Eade and Katharina Dost and Samuel M Meier-Menches and David C Goldstone and Matthew P Sullivan and Christian Hartinger and J\\"{o}rg Wicker and Katerina Taskova},
url = {https://adducthunter.wickerlab.org},
doi = {10.21203/rs.3.rs-3322854/v1},
year  = {2023},
date = {2023-05-29},
urldate = {2023-05-29},
abstract = {Mass spectrometry (MS) is an analytical technique for molecule identification that can be used for investigating protein-metal complex interactions. Once the MS data is collected, the mass spectra are usually interpreted manually to identify the adducts formed which arise from the interactions between proteins and metal-based species. However, with increasing resolution, dataset size, and species complexity, the time required to identify adducts and the error-prone nature of manual assignment have become limiting factors in MS analysis. AdductHunter is an analysis tool to automate the peak identification process using constraint integer optimization to find feasible combinations of protein and fragments, and dynamic time warping to calculate the dissimilarity between the theoretical isotope pattern of a species and its experimental isotope peak distribution. Our results show fast and accurate identification of protein adducts to aid mass spectrometry analysis.},
keywords = {cheminformatics, computational sustainability, data mining, dynamic time warping, machine learning, mass spectrometry},
pubstate = {forthcoming},
tppubtype = {article}
}`;
  const APA7 = "Derek Long, Liam Eade, Matthew P Sullivan et al. AdductHunter: Identifying Protein-Metal Complex Adducts in Mass Spectra, 05 September 2023, PREPRINT (Version 1) available at Research Square [https://doi.org/10.21203/rs.3.rs-3322854/v1]"
  
  

  useEffect(() => {
    async function GetTrendingPostsIDs() {
      try{ 
        await instance ({
          // Set URL to get all posts by ID
          url: "posts/trending",
          method: "GET",
      }).then((res) => {
        setPublicPosts(res.data)
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetTrendingPostsIDs();
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
              <h1 style={{textAlign: 'center', color:'black'}}>BibTeX</h1>
              <div className= "landing-desc-box">
              <pre id = "BibTexPre" style= {{whiteSpace: 'pre-line'}}>
                {`
                @article{Long2023adducthunter,
                  title = {AdductHunter: Identifying Protein-Metal Complex Adducts in Mass Spectra},
                  author = {Derek Long and Liam Eade and Katharina Dost and Samuel M Meier-Menches 
                  and David C Goldstone and Matthew P Sullivan and Christian Hartinger and Jörg Wicker and Katerina Taskova},
                  url = {https://adducthunter.wickerlab.org},
                  doi = {10.21203/rs.3.rs-3322854/v1},
                  year  = {2023},
                  date = {2023-05-29},
                  urldate = {2023-05-29},
                  abstract = {Mass spectrometry (MS) is an analytical technique for molecule identification that can be used for investigating protein-metal complex interactions. Once the MS data is collected, the mass spectra are usually interpreted manually to identify the adducts formed which arise from the interactions between proteins and metal-based species. However, with increasing resolution, dataset size, and
                  species complexity, the time required to identify adducts and the error-prone nature of manual assignment have become limiting factors in MS analysis. AdductHunter is an analysis tool to automate the peak identification process using constraint integer optimization to find feasible combinations of protein and fragments, and dynamic time warping to calculate the dissimilarity between the theoretical isotope pattern of a species and its experimental isotope peak distribution. Our results show fast and accurate identification of protein adducts to aid mass spectrometry analysis.},
                  keywords = {cheminformatics, computational sustainability, data mining, dynamic time warping, machine learning, mass spectrometry},
                  pubstate = {forthcoming},
                  tppubtype = {article}
                }
                `}
              </pre>
              <Button onClick={() => navigator.clipboard.writeText(BibTeX)}
              sx={{ 
                fontSize: '0.75rem', 
                bgcolor: 'transparent', 
                marginLeft: '-10px',
                '&:hover': { 
                  bgcolor: 'rgba(0, 0, 0, 0.04)', 
                },
              }}>Copy to Clipboard &nbsp;<ContentCopyIcon fontSize='inherit'/></Button>
              

              </div>

              <h1 style={{textAlign: 'center', color:'black'}}>APA 7</h1>
              
              <div className= "landing-desc-box">
              <pre style= {{whiteSpace: 'pre-line'}}>
              {`
              Derek Long, Liam Eade, Matthew P Sullivan et al. AdductHunter: Identifying Protein-Metal Complex Adducts in Mass Spectra, 05 September 2023, PREPRINT (Version 1) available at Research Square [https://doi.org/10.21203/rs.3.rs-3322854/v1]
              `}  
              </pre>
              <Button onClick={() => navigator.clipboard.writeText(APA7)}
              sx={{ 
                fontSize: '0.75rem', 
                bgcolor: 'transparent', 
                marginLeft: '-10px',
                '&:hover': { 
                  bgcolor: 'rgba(0, 0, 0, 0.04)', 
                },
              }}>Copy to Clipboard &nbsp;<ContentCopyIcon fontSize='inherit'/></Button>
              </div>
            </Box>
          </div>
          <div className= "landing-post-container" style= {{flex: 1, marginTop: "20px", marginBottom:"20px", marginLeft:"60px", marginRight:"60px", padding: "10px"}}>
            <PostGrid narrow={true} post_array={PublicPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}