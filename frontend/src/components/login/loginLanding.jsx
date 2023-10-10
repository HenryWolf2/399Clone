import { size } from "@floating-ui/core";
import HomeGraph from "../home/homeGraph";
import PostGraph from "../individual-posts/postGraph";
import { Stack, Box} from "@mui/material";

const LoginLanding = () => {
    
    return(
        <div>
            <div class= "landing-desc-box">
              <p class= "landingText">
              Mass spectrometry is a powerful analytical technique that has revolutionized research and analysis in various fields. With the ability to provide both qualitative and quantitative data, researchers can gain valuable insights into the chemical composition of substances.              
              </p>
              <p class= "landingText">
              Our platform takes mass spectrometry to the next level by providing an innovative environment for storing, sharing, and analyzing mass spectrometry data. Through advanced data analysis tools, researchers can perform various analytical techniques, and visualise data results with the use of interactive elements such as the example graph below.              
              </p>
              <br></br>
              
              <div style={{fontSize:'16px'}}>
              <Stack sx={{margin: "0px 20px 0px 20px"}}>
              <HomeGraph/>
              
              </Stack>
              </div>
              
              
              
              <p class= "landingText">
              Collaboration and data sharing are at the heart of our platform. By creating profiles, researchers can connect with like-minded individuals, form research groups, and share their analyzed data securely.               
              </p>
              <p class= "landingText">
              Don't miss out on this opportunity to join a vibrant community of mass spectrometry researchers. Register now and unlock the endless possibilities for collaboration, data sharing, and analysis on our platform. Together, let's push the boundaries of mass spectrometry research and make groundbreaking discoveries!
              </p>
            </div>
            
        </div>
    )
}

export default LoginLanding;